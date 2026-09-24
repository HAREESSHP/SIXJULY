import { useEffect, useRef } from 'react'
import './FromIdeaToLaunch.css'

const LAUNCH_STEPS = [
  {
    number: '01',
    title: 'Think',
    description:
      'We understand the problem, explore opportunities and decide what is worth building.',
    tags: ['Strategy', 'Research', 'Concepts', 'Creative Direction'],
  },
  {
    number: '02',
    title: 'Design',
    description:
      'We turn the idea into an experience people can see, understand and use.',
    tags: ['UX/UI', 'Art Direction', '3D & Motion', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We turn the concept into a real product and bring it to market.',
    tags: ['Frontend', 'Backend', 'AI', 'Integrations', 'Infrastructure'],
  },
]

const HEADER_OFFSET = 84
const BASE_TOP = 96

function FromIdeaToLaunch() {
  const rightColRef = useRef(null)

  // Synchronize card exit so all stacked cards move together as one locked unit
  useEffect(() => {
    const container = rightColRef.current
    if (!container) return

    const cards = container.querySelectorAll('.wm-launch-card')
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
    <section className="wm-launch-section" id="process">
      <div className="wm-launch-container">
        {/* Left Column: Sticky Title, Description & Explore Services CTA */}
        <aside className="wm-launch-left">
          <div className="wm-launch-left-sticky">
            <h2 className="wm-launch-heading">
              <span>FROM IDEA</span>
              <span>TO LAUNCH</span>
            </h2>

            <p className="wm-launch-subtext">
              From strategy to deployment. We provide full-scope delivery or targeted expertise to solve your specific design and technical challenges.
            </p>

            <a href="#services" className="wm-launch-cta-btn">
              <span className="wm-launch-cta-text">Explore Services</span>
              <span className="wm-launch-cta-arrow" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </a>
          </div>
        </aside>

        {/* Right Column: 3 Stacking Process Cards (Think, Design, Build) */}
        <div className="wm-launch-right" ref={rightColRef}>
          {LAUNCH_STEPS.map((step, index) => (
            <article
              key={step.number}
              className="wm-launch-card"
              style={{
                zIndex: index + 1,
                top: `calc(${BASE_TOP}px + ${index * HEADER_OFFSET}px)`,
              }}
            >
              <div className="wm-launch-card-header">
                <div className="wm-launch-card-badge">
                  <span>{step.number}</span>
                </div>
                <h3 className="wm-launch-card-title">{step.title}</h3>
              </div>

              <p className="wm-launch-card-description">{step.description}</p>

              <div className="wm-launch-card-tags">
                {step.tags.map((tag) => (
                  <span key={tag} className="wm-launch-pill">
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

export default FromIdeaToLaunch
