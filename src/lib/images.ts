import { imageManifest, type ImageName } from '../data/images.generated'

export type ImageFormat = 'avif' | 'webp' | 'jpg'

/** "name-480.avif 480w, name-720.avif 720w" – widths come from the generated manifest */
export function srcSet(name: ImageName, format: ImageFormat): string {
  return imageManifest[name].widths.map((w) => `/images/${name}-${w}.${format} ${w}w`).join(', ')
}

/** Largest JPG as universal <img src> fallback */
export function fallbackSrc(name: ImageName): string {
  const { widths } = imageManifest[name]
  return `/images/${name}-${widths[widths.length - 1]}.jpg`
}
