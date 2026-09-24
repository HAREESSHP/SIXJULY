import { useEffect, useRef } from 'react'
import flagshipVisual from '../assets/projects/flagship-visual.jpg'
import aiVisual from '../assets/projects/ai-interfaces-visual.jpg'
import digitalProductsVisual from '../assets/projects/digital-products-visual.jpg'
import commerceVisual from '../assets/projects/commerce-visual.jpg'
import './WhatWeBuild.css'

function StickerStar() {
  return (
    <div className="wm-ticker-badge" aria-hidden="true">
      <svg
        className="wm-ticker-badge-svg"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="badgeShadow" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.14" />
          </filter>
          <linearGradient id="badgePaper" x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f4f4f6" />
            <stop offset="100%" stopColor="#e2e4e8" />
          </linearGradient>
        </defs>

        {/* Circular Sticker Base */}
        <circle cx="40" cy="40" r="37" fill="url(#badgePaper)" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" />

        {/* Subtle Wrinkle & Crease Effects */}
        <path d="M15 26 C28 34, 44 22, 65 34" stroke="rgba(0, 0, 0, 0.09)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M22 54 C34 46, 48 58, 62 48" stroke="rgba(0, 0, 0, 0.07)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M37 10 C35 28, 45 42, 41 70" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.3" fill="none" strokeLinecap="round" />

        {/* Center 4-Pointed Sparkle Star */}
        <path
          d="M40 16 L44.5 35.5 L64 40 L44.5 44.5 L40 64 L35.5 44.5 L16 40 L35.5 35.5 Z"
          fill="#111111"
        />
      </svg>
    </div>
  )
}

function TickerItem() {
  return (
    <div className="wm-ticker-item">
      <StickerStar />
      <span className="wm-ticker-text">WHAT WE BUILD</span>
    </div>
  )
}

const BUILD_SERVICES = [
  {
    id: 'flagship-websites',
    number: '01',
    title: 'FLAGSHIP WEBSITES',
    theme: 'dark',
    visual: flagshipVisual,
    alt: 'Flagship Websites showcase visual',
    description:
      'High-end websites designed to shape perception and strengthen your brand. We combine immersive storytelling with flawless interaction—without sacrificing performance.',
    tags: [
      'Company Website',
      'Product Website',
      'Immersive Website',
      'Landing Page',
      'Content Hub',
    ],
  },
  {
    id: 'ai-products',
    number: '02',
    title: 'AI PRODUCTS & INTELLIGENT INTERFACES',
    theme: 'dark',
    visual: aiVisual,
    alt: 'AI Products & Intelligent Interfaces visual',
    description:
      'AI-powered products that turn complex logic into intuitive interactions. From conversational interfaces to assessment tools and internal AI assistants, we build where AI creates real, measurable value.',
    tags: [
      'Internal AI Tool',
      'Assessment Tool',
      'AI Assistant',
      'Conversational UI',
      'Generative Product',
    ],
  },
  {
    id: 'digital-products',
    number: '03',
    title: 'DIGITAL PRODUCTS & PLATFORMS',
    theme: 'light',
    visual: digitalProductsVisual,
    alt: 'Digital Products & Platforms showcase visual',
    description:
      'Digital products built for demanding environments. From SaaS platforms and real-time systems to business portals and on-chain applications, we design and engineer products that handle complexity while staying intuitive.',
    tags: [
      'Mobile App',
      'Web App',
      'SaaS Product',
      'Data Dashboard',
      'dApp',
      'Web3 Integration',
    ],
  },
  {
    id: 'commerce-experience',
    number: '04',
    title: 'COMMERCE & PRODUCT EXPERIENCE',
    theme: 'dark',
    visual: commerceVisual,
    alt: 'Commerce & Product Experience showcase visual',
    description:
      'Beyond the standard storefront. We design premium shopping experiences where strong storytelling and thoughtful UX increase perceived value and conversion.',
    tags: [
      'Premium Storefront',
      'B2B Portal',
      'Product Configurator',
      'Custom Commerce',
    ],
  },
]

const HEADER_OFFSET = 88
const BASE_TOP = 92

function WhatWeBuild() {
  const rightColRef = useRef(null)

  // Synchronize card exit so all stacked cards move together as one locked unit
  useEffect(() => {
    const container = rightColRef.current
    if (!container) return

    const cards = container.querySelectorAll('.wm-build-card')
    if (cards.length < 2) return

    const lastIndex = cards.length - 1
    const lastCard = cards[lastIndex]
    const lastCardStickyTop = BASE_TOP + lastIndex * HEADER_OFFSET

    const getLayoutConfig = () => {
      const w = window.innerWidth
      if (w <= 480) {
        return { baseTop: 66, headerOffset: 46 }
      } else if (w <= 960) {
        return { baseTop: 74, headerOffset: 54 }
      }
      return { baseTop: BASE_TOP, headerOffset: HEADER_OFFSET }
    }

    const updateStack = () => {
      const { baseTop, headerOffset } = getLayoutConfig()
      const lastCardStickyTop = baseTop + lastIndex * headerOffset

      // Calculate how far the final card has been pushed up past its sticky position
      const lastCardRect = lastCard.getBoundingClientRect()
      const pushUp = Math.max(0, lastCardStickyTop - lastCardRect.top)

      // Shift preceding cards by the exact same amount so the entire stack stays locked together
      for (let i = 0; i < lastIndex; i++) {
        if (pushUp > 0.5) {
          cards[i].style.transform = `translate3d(0, -${pushUp.toFixed(1)}px, 0)`
        } else if (cards[i].style.transform) {
          cards[i].style.transform = ''
        }
      }
    }

    window.addEventListener('scroll', updateStack, { passive: true })
    window.addEventListener('resize', updateStack, { passive: true })
    updateStack()

    return () => {
      window.removeEventListener('scroll', updateStack)
      window.removeEventListener('resize', updateStack)
    }
  }, [])

  return (
    <section className="wm-what-we-build" id="services">
      {/* Top Rolling Marquee */}
      <div className="wm-ticker-viewport" aria-label="What We Build Marquee">
        <div className="wm-ticker-track">
          <div className="wm-ticker-segment">
            <TickerItem />
            <TickerItem />
            <TickerItem />
            <TickerItem />
          </div>
          <div className="wm-ticker-segment" aria-hidden="true">
            <TickerItem />
            <TickerItem />
            <TickerItem />
            <TickerItem />
          </div>
        </div>
      </div>

      {/* Main Two-Column Showcase Section */}
      <div className="wm-build-container">
        {/* Left Column: Sticky Title & Subtext */}
        <aside className="wm-build-left">
          <div className="wm-build-left-sticky">
            <h2 className="wm-build-heading">
              <span>WHAT</span>
              <span>WE BUILD</span>
            </h2>
            <p className="wm-build-subtext">
              From idea to launch, we create digital products that help ambitious brands do something meaningful better.
            </p>
          </div>
        </aside>

        {/* Right Column: Stacking Service Cards where only titles remain visible on overlap */}
        <div className="wm-build-right" ref={rightColRef}>
          {BUILD_SERVICES.map((service, index) => (
            <article
              key={service.id}
              className={`wm-build-card ${service.theme === 'light' ? 'is-light' : ''}`}
              style={{
                zIndex: index + 1,
                '--card-index': index,
              }}
            >
              <div className="wm-bcard-header">
                <h3 className="wm-bcard-title">{service.title}</h3>
                <span className="wm-bcard-num">{service.number}</span>
              </div>

              <div className="wm-bcard-media">
                <img
                  src={service.visual}
                  alt={service.alt}
                  className="wm-bcard-img"
                  loading="lazy"
                />
              </div>

              <p className="wm-bcard-description">{service.description}</p>

              <div className="wm-bcard-tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="wm-bcard-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeBuild
