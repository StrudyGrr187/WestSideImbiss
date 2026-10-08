#!/usr/bin/env node
/**
 * Image pipeline: assets-source/selected/*.jpg → public/images/{name}-{w}.{avif,webp,jpg}
 *
 * - Crops the "@westside_imbiss16" watermark off landscape reel frames (bottom ~11%).
 * - Blurs the unconfirmed price tag ("5,50") in the hero frame – we never show prices.
 * - Never upscales: requested widths larger than the (cropped) source are dropped.
 * - Writes src/data/images.generated.ts so components always match the exported files.
 *
 * Requires ffmpeg, cwebp and avifenc on PATH (Homebrew: `brew install ffmpeg webp libavif`).
 * Usage: npm run images
 */
import { execFile } from 'node:child_process'
import { mkdir, rm, writeFile, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { tmpdir } from 'node:os'

const run = promisify(execFile)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(root, 'assets-source/selected')
const OUT = join(root, 'public/images')
const MANIFEST = join(root, 'src/data/images.generated.ts')

/** Landscape reel frames: 1276×718, watermark sits at y≈655–685 → keep top 640px. */
const LANDSCAPE_CROP = 'crop=1276:640:0:0'
/**
 * Price tag "5,50" in the hero frame (source coords x≈672–713, y≈275–300).
 * Feathered defocus instead of a hard box: the whole frame is blurred + slightly darkened,
 * then composited back only through a gaussian-softened elliptical-ish mask → no visible edges.
 */
const HERO_PRICE_BLUR =
  '[0:v]split[base][src];' +
  '[src]gblur=sigma=90:steps=4,eq=contrast=0.5:brightness=-0.1:saturation=0.8,format=rgba[soft];' +
  'color=c=black:s=1276x718:d=1,format=gray,' +
  'drawbox=x=640:y=250:w=106:h=74:color=white:t=fill,lut=c0=if(gt(val\\,128)\\,255\\,0),gblur=sigma=9[mask];' +
  '[soft][mask]alphamerge[softm];' +
  '[base][softm]overlay=0:0:shortest=1,format=yuv420p,'

/**
 * @typedef {{ name: string, file: string, widths: number[], srcW: number, srcH: number, filter?: string, complex?: boolean }} Job
 * @type {Job[]}
 */
const jobs = [
  { name: 'hero-spiess', file: 'hero-spiess-landscape.jpg', widths: [640, 960, 1276], srcW: 1276, srcH: 640, filter: HERO_PRICE_BLUR + LANDSCAPE_CROP, complex: true },
  // Golden spieß from the opening reel (warm light) – portrait cut, no watermark, no price tag in frame.
  { name: 'hero-spiess-mobile', file: 'hero-spiess-gold.jpg', widths: [404], srcW: 404, srcH: 718, filter: 'crop=404:718:110:0' },
  { name: 'food-doener', file: 'food-doener-spiess-gold.jpg', widths: [404], srcW: 404, srcH: 718, filter: 'crop=404:718:0:0' },
  { name: 'food-pizza', file: 'food-pizza.jpg', widths: [480, 720], srcW: 720, srcH: 1280 },
  // CTA "Döner. Aber richtig." – square crop around the sandwich (frame 59.8s of the Adnan Be Halal reel).
  { name: 'cta-doener', file: 'food-doener-sandwich-close.jpg', widths: [480, 720], srcW: 720, srcH: 720, filter: 'crop=720:720:0:10' },
  { name: 'food-salatbar', file: 'food-salatbar.jpg', widths: [480, 720], srcW: 720, srcH: 1280 },
  { name: 'opening-queue', file: 'opening-queue.jpg', widths: [640, 960, 1276], srcW: 1276, srcH: 640, filter: LANDSCAPE_CROP },
  { name: 'opening-crowd', file: 'opening-crowd-inside.jpg', widths: [640, 960, 1276], srcW: 1276, srcH: 640, filter: LANDSCAPE_CROP },
  { name: 'storefront', file: 'storefront-street.jpg', widths: [640, 960, 1276], srcW: 1276, srcH: 640, filter: LANDSCAPE_CROP },
  { name: 'reel-DeHv-ntKprW', file: 'reel-DeHv-ntKprW.jpg', widths: [240, 360], srcW: 360, srcH: 640 },
  // The opening reel is landscape (letterboxed thumbnail) → portrait cover cut from its own frame, no upscaling.
  { name: 'reel-DeCqNSYKIay', file: 'opening-spiess-staff.jpg', widths: [240, 360], srcW: 404, srcH: 718, filter: 'crop=404:718:130:0' },
  { name: 'reel-Dd4JbgaKXOM', file: 'reel-Dd4JbgaKXOM.jpg', widths: [240, 360], srcW: 360, srcH: 640 },
  { name: 'logo', file: 'logo.jpg', widths: [80, 150], srcW: 150, srcH: 150 },
]

async function ffmpeg(input, filter, complex, output) {
  const args = ['-loglevel', 'error', '-y', '-i', input]
  if (complex) args.push('-filter_complex', filter)
  else args.push('-vf', filter)
  args.push('-frames:v', '1', output)
  await run('ffmpeg', args)
}

async function processJob(job, tmp) {
  const input = join(SRC, job.file)
  const widths = job.widths.filter((w) => w <= job.srcW)
  const variants = []
  for (const w of widths) {
    const h = Math.round((job.srcH * w) / job.srcW)
    const base = `${job.name}-${w}`
    const png = join(tmp, `${base}.png`)
    const scale = `scale=${w}:${h}:flags=lanczos`
    const filter = job.filter ? `${job.filter},${scale}` : scale
    await ffmpeg(input, filter, Boolean(job.complex), png)
    await run('cwebp', ['-quiet', '-q', '78', '-m', '6', '-af', png, '-o', join(OUT, `${base}.webp`)])
    await run('avifenc', ['-q', '58', '-s', '4', '-y', '420', png, join(OUT, `${base}.avif`)])
    await run('ffmpeg', ['-loglevel', 'error', '-y', '-i', png, '-q:v', '4', join(OUT, `${base}.jpg`)])
    variants.push(w)
  }
  const maxW = variants[variants.length - 1]
  return { name: job.name, widths: variants, width: maxW, height: Math.round((job.srcH * maxW) / job.srcW) }
}

async function favicons(tmp) {
  const input = join(SRC, 'logo.jpg')
  // 150px source → favicons are downscaled only; apple-touch stays at native 150px.
  await ffmpeg(input, 'scale=32:32:flags=lanczos', false, join(root, 'public/favicon-32.png'))
  await ffmpeg(input, 'scale=150:150', false, join(tmp, 'apple.png'))
  await copyFile(join(tmp, 'apple.png'), join(root, 'public/apple-touch-icon.png'))
}

async function ogImage() {
  // 1200×630 social card from the hero frame (price tag blurred, watermark cropped).
  await ffmpeg(
    join(SRC, 'hero-spiess-landscape.jpg'),
    `${HERO_PRICE_BLUR}crop=1200:630:38:0`,
    true,
    join(OUT, 'og-westside.jpg'),
  )
}

async function main() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true })
  await mkdir(OUT, { recursive: true })
  const tmp = join(tmpdir(), `westside-img-${process.pid}`)
  await mkdir(tmp, { recursive: true })

  const manifest = []
  for (const job of jobs) {
    manifest.push(await processJob(job, tmp))
    process.stdout.write(`✓ ${job.name}\n`)
  }
  await favicons(tmp)
  await ogImage()
  await rm(tmp, { recursive: true })

  const body = manifest
    .map((m) => `  '${m.name}': { widths: [${m.widths.join(', ')}], width: ${m.width}, height: ${m.height} },`)
    .join('\n')
  await writeFile(
    MANIFEST,
    `// AUTO-GENERATED by scripts/optimize-images.mjs – do not edit by hand.\n` +
      `export const imageManifest = {\n${body}\n} as const\n\n` +
      `export type ImageName = keyof typeof imageManifest\n`,
  )
  process.stdout.write(`\nWrote ${manifest.length} images + manifest.\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
