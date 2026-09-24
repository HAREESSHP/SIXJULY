import { useEffect, useRef } from 'react'
import sprintBg from '../assets/projects/direction-sprint-bg.jpg'
import deliveryBg from '../assets/projects/build-delivery-bg.jpg'
import './StartWhereYouAre.css'

const BASE_TOP = 86
const HEADER_OFFSET = 118

function StartWhereYouAre() {
  const containerRef = useRef(null)

  // Synchronize card exit so Card 1 and Card 2 glide together as a locked unit
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll('.wm-start-card')
    if (cards.length < 2) return

    const card1 = cards[0]
    const card2 = cards[1]
    const card2StickyTop = BASE_TOP + HEADER_OFFSET

    const updateStack = () => {
      if (window.innerWidth <= 960) {
        if (card1.style.transform) card1.style.transform = ''
        return
      }

      const card2Rect = card2.getBoundingClientRect()
      const pushUp = Math.max(0, card2StickyTop - card2Rect.top)

      if (pushUp > 0.5) {
        card1.style.transform = `translate3d(0, -${pushUp.toFixed(1)}px, 0)`
      } else if (card1.style.transform) {
        card1.style.transform = ''
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
    <section className="wm-start-section" id="start-where-you-are">
      {/* Centered Headline & Intro Subtext */}
      <div className="wm-start-header">
        <h2 className="wm-start-heading">START WHERE YOU ARE</h2>
        <p className="wm-start-subtext">
          You don’t need a finished brief to start. Come with a clear scope, an early idea, or anything in between – we’ll meet you where you are and move it forward.
        </p>
      </div>

      {/* Sticky Stacking Cards Container */}
      <div className="wm-start-cards-container" ref={containerRef}>
        {/* Card 1: DIRECTION SPRINT (Sticky pinned at top) */}
        <article
          className="wm-start-card wm-sprint-card"
          style={{
            zIndex: 1,
            top: `${BASE_TOP}px`,
          }}
        >
          <div className="wm-card-bg-layer" aria-hidden="true">
            <img
              src={sprintBg}
              alt=""
              className="wm-card-bg-img"
              loading="lazy"
            />
            <div className="wm-card-bg-overlay wm-sprint-overlay" />
          </div>

          <div className="wm-card-content">
            <div className="wm-card-top">
              <span className="wm-card-eyebrow">NOT SURE WHAT TO BUILD?</span>
              <h3 className="wm-card-title">DIRECTION SPRINT</h3>
            </div>

            <div className="wm-sprint-bottom-panel">
              <p className="wm-sprint-desc">
                A focused, fixed-price phase that turns an early need into a clear, costed plan ready to build.
              </p>
              <div className="wm-card-tags">
                <span className="wm-start-pill">Clear Direction</span>
                <span className="wm-start-pill">Defined Scope</span>
                <span className="wm-start-pill">Budget & Timeline</span>
                <span className="wm-start-pill">Ready to Build</span>
              </div>
            </div>
          </div>
        </article>

        {/* Card 2: BUILD & DELIVERY (Scrolls and stops with tab offset on Card 1) */}
        <article
          className="wm-start-card wm-delivery-card"
          style={{
            zIndex: 2,
            top: `calc(${BASE_TOP}px + ${HEADER_OFFSET}px)`,
          }}
        >
          <div className="wm-card-bg-layer" aria-hidden="true">
            <img
              src={deliveryBg}
              alt=""
              className="wm-card-bg-img"
              loading="lazy"
            />
            <div className="wm-card-bg-overlay wm-delivery-overlay" />
          </div>

          <div className="wm-card-content">
            <div className="wm-card-top">
              <span className="wm-card-eyebrow">READY TO BUILD?</span>
              <h3 className="wm-card-title">BUILD & DELIVERY</h3>
            </div>

            <div className="wm-delivery-grid">
              <div className="wm-delivery-col">
                <h4 className="wm-delivery-col-title">END-TO-END</h4>
                <p className="wm-delivery-col-desc">
                  We take the product from direction to launch.
                </p>
                <div className="wm-card-tags">
                  <span className="wm-start-pill">From Brief to Launch</span>
                  <span className="wm-start-pill">Full Ownership</span>
                  <span className="wm-start-pill">Cross-functional</span>
                </div>
              </div>

              <div className="wm-delivery-col">
                <h4 className="wm-delivery-col-title">EMBEDDED</h4>
                <p className="wm-delivery-col-desc">
                  Senior specialists plug into your team where you need them most.
                </p>
                <div className="wm-card-tags">
                  <span className="wm-start-pill">Fits Your Workflow</span>
                  <span className="wm-start-pill">Missing Expertise</span>
                  <span className="wm-start-pill">Flexible Scope</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default StartWhereYouAre
