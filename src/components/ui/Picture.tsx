import { imageManifest } from '../../data/images.generated'
import type { SiteImage } from '../../data/westside'
import { fallbackSrc, srcSet } from '../../lib/images'

const FORMATS = ['avif', 'webp'] as const

interface PictureProps {
  image: SiteImage
  /** `sizes` attribute – describe the rendered CSS width as precisely as possible */
  sizes: string
  className?: string
  /** Above-the-fold: eager + high fetch priority */
  priority?: boolean
  /** Decorative duplicates (alt="") */
  decorative?: boolean
}

/** Responsive AVIF/WebP/JPG picture. Always emits intrinsic width/height to prevent CLS. */
export function Picture({ image, sizes, className, priority = false, decorative = false }: PictureProps) {
  const meta = imageManifest[image.name]
  return (
    <picture>
      {FORMATS.map((format) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet(image.name, format)} sizes={sizes} />
      ))}
      <img
        src={fallbackSrc(image.name)}
        srcSet={srcSet(image.name, 'jpg')}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={decorative ? '' : image.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={className}
        style={image.position ? { objectPosition: image.position } : undefined}
      />
    </picture>
  )
}
