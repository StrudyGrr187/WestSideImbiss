import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, SVGProps } from 'react'
import { ArrowUpRight } from 'lucide-react'

/** Any Lucide icon or Lucide-compatible custom icon (e.g. InstagramIcon) */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>

type Variant = 'primary' | 'secondary'

const base =
  'group inline-flex h-[52px] shrink-0 items-center justify-center gap-2.5 rounded-full px-7 text-[15px] font-bold uppercase tracking-[0.06em] whitespace-nowrap transition-[background-color,border-color,box-shadow,color] duration-200 ease-brand select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-bg hover:shadow-[var(--glow-gold)] active:bg-gold-deep',
  secondary: 'border border-line-strong text-text hover:border-gold active:border-gold-deep',
}

function buttonClass(variant: Variant = 'primary', extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`.trim()
}

function ButtonIcon({ icon: Icon = ArrowUpRight }: { icon?: IconComponent }) {
  return (
    <Icon
      aria-hidden="true"
      size={18}
      strokeWidth={1.75}
      className="transition-transform duration-200 ease-brand group-hover:translate-x-[3px] group-hover:-translate-y-[3px] motion-reduce:group-hover:translate-0"
    />
  )
}

interface CommonProps {
  variant?: Variant
  icon?: IconComponent
  /** Hide the trailing icon */
  noIcon?: boolean
  children: ReactNode
  className?: string
}

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    /** Opens in a new tab with safe rel + screenreader hint */
    external?: boolean
  }

export function ButtonLink({
  variant = 'primary',
  icon,
  noIcon,
  external,
  children,
  className = '',
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={buttonClass(variant, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span>{children}</span>
      {external && <span className="sr-only"> (öffnet in neuem Tab)</span>}
      {!noIcon && <ButtonIcon icon={icon} />}
    </a>
  )
}

type ButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export function Button({ variant = 'primary', icon, noIcon, children, className = '', type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, className)} {...rest}>
      <span>{children}</span>
      {!noIcon && <ButtonIcon icon={icon} />}
    </button>
  )
}
