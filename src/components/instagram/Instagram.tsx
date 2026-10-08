import { InstagramIcon } from '../ui/InstagramIcon'
import { links, reels } from '../../data/westside'
import { ButtonLink } from '../ui/Button'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { ReelCard } from './ReelCard'

export function Instagram() {
  return (
    <section id="instagram" aria-labelledby="instagram-title" className="section-y border-t border-line">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            id="instagram-title"
            eyebrow={links.instagramHandle}
            title={
              <>
                Westside auf <span className="text-gold">Instagram</span>
              </>
            }
          />
          <Reveal className="hidden lg:block">
            <ButtonLink href={links.instagram} external variant="secondary" icon={InstagramIcon}>
              Mehr auf Instagram
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 lg:mx-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0"
        >
          {reels.map((reel) => (
            <Reveal inGroup as="li" key={reel.id} className="w-[72vw] max-w-[360px] shrink-0 snap-start lg:w-auto lg:justify-self-center">
              <ReelCard reel={reel} />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 lg:hidden">
          <ButtonLink href={links.instagram} external variant="secondary" icon={InstagramIcon} className="w-full sm:w-auto">
            Mehr auf Instagram
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
