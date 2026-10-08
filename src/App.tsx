import { LazyMotion, MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Food } from './components/food/Food'
import { Reviews } from './components/reviews/Reviews'
import { Instagram } from './components/instagram/Instagram'
import { About } from './components/about/About'
import { Location } from './components/location/Location'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { MobileBar } from './components/MobileBar'
import { OrderSheetProvider } from './components/order/OrderSheetProvider'

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {/* reducedMotion="user": framer drops transform animations for prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">
        <OrderSheetProvider>
          <a
            href="#main"
            className="fixed top-3 left-3 z-[90] -translate-y-24 rounded-full bg-gold px-5 py-3 text-[15px] font-bold text-bg transition-transform focus-visible:translate-y-0"
          >
            Zum Inhalt springen
          </a>
          <div className="pb-mobile-bar overflow-x-clip">
            <Navbar />
            <main id="main" tabIndex={-1} className="outline-none">
              <Hero />
              <Marquee />
              <Food />
              <Reviews />
              <Instagram />
              <About />
              <Location />
              <FinalCta />
            </main>
            <Footer />
          </div>
          <MobileBar />
          <div className="grain" aria-hidden="true" />
        </OrderSheetProvider>
      </MotionConfig>
    </LazyMotion>
  )
}
