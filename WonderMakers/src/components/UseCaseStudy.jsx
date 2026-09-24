import { useEffect, useRef } from 'react'
import './UseCaseStudy.css'

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
          <filter id="badgeShadowCase" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.14" />
          </filter>
          <linearGradient id="badgePaperCase" x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f4f4f6" />
            <stop offset="100%" stopColor="#e2e4e8" />
          </linearGradient>
        </defs>

        {/* Circular Sticker Base */}
        <circle cx="40" cy="40" r="37" fill="url(#badgePaperCase)" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" />

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

function CaseTickerItem() {
  return (
    <div className="wm-ticker-item">
      <StickerStar />
      <span className="wm-ticker-text">USE CASE STUDY</span>
    </div>
  )
}

const AI_LEVERAGE_CASES = [
  {
    number: '01',
    title: 'CREATE SOMETHING NEW',
    description:
      'Turn an early idea or opportunity into a new digital product or experience.',
    details: 'From 0 to 1 exploration, rapid validation and architecture of next-generation digital products.',
  },
  {
    number: '02',
    title: 'REINVENT WHAT ALREADY EXISTS',
    description:
      'Rethink an existing website, product or customer experience using new technology.',
    details: 'Modernizing core platforms with intelligent workflows and high-converting UX.',
  },
  {
    number: '03',
    title: 'ADD INTELLIGENCE',
    description:
      'Use AI to make products more useful, personal and responsive.',
    details: 'Embedding practical agentic flows and contextual understanding directly into user journeys.',
  },
  {
    number: '04',
    title: 'PUSH THE EXPERIENCE FURTHER',
    description:
      'Combine interaction, motion, 3D and emerging technology to create something people remember.',
    details: 'Crafting unforgettable brand perception through fluid dynamics and immersive tech.',
  },
]

const HEADER_OFFSET = 84
const BASE_TOP = 96

function UseCaseStudy() {
  const rightColRef = useRef(null)

  // Synchronize card exit so all stacked cards move together as one locked unit
  useEffect(() => {
    const container = rightColRef.current
    if (!container) return

    const cards = container.querySelectorAll('.wm-leverage-card')
    if (cards.length < 2) return

    const lastIndex = cards.length - 1
    const lastCard = cards[lastIndex]
    const lastCardStickyTop = BASE_TOP + lastIndex * HEADER_OFFSET

    const updateStack = () => {
      if (window.innerWidth <= 960) {
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].style.transform) cards[i].style.transform = ''
        }
        return
      }

      const lastCardRect = lastCard.getBoundingClientRect()
      const pushUp = Math.max(0, lastCardStickyTop - lastCardRect.top)

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
    <section className="wm-use-case-study" id="case-studies">
      {/* Top Rolling Marquee */}
      <div className="wm-ticker-viewport" aria-label="Use Case Study Marquee">
        <div className="wm-ticker-track">
          <div className="wm-ticker-segment">
            <CaseTickerItem />
            <CaseTickerItem />
            <CaseTickerItem />
            <CaseTickerItem />
          </div>
          <div className="wm-ticker-segment" aria-hidden="true">
            <CaseTickerItem />
            <CaseTickerItem />
            <CaseTickerItem />
            <CaseTickerItem />
          </div>
        </div>
      </div>

      {/* Main Two-Column Showcase Section (Sticky Stacking Cards) */}
      <div className="wm-case-container">
        {/* Left Column: Sticky Title & Subtext */}
        <aside className="wm-case-left">
          <div className="wm-case-left-sticky">
            <h2 className="wm-case-heading">
              <span>AI GIVES US LEVERAGE.</span>
              <span>WE GIVE IT DIRECTION.</span>
            </h2>
            <p className="wm-case-subtext">
              We bring together creativity, design, technology and AI to help ambitious brands explore what's now possible, choose what matters and build it.
            </p>
          </div>
        </aside>

        {/* Right Column: Stacking Service Cards where tabs remain visible on overlap */}
        <div className="wm-case-right" ref={rightColRef}>
          {AI_LEVERAGE_CASES.map((item, index) => (
            <article
              key={item.number}
              className="wm-leverage-card"
              style={{
                zIndex: index + 1,
                top: `calc(${BASE_TOP}px + ${index * HEADER_OFFSET}px)`,
              }}
            >
              <div className="wm-leverage-card-wave" aria-hidden="true" />
              
              <div className="wm-leverage-card-header">
                <h3 className="wm-leverage-card-title">{item.title}</h3>
                <div className="wm-leverage-card-badge">
                  <span>{item.number}</span>
                </div>
              </div>

              <p className="wm-leverage-card-description">{item.description}</p>
              
              {item.details && (
                <p className="wm-leverage-card-details">{item.details}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCaseStudy
