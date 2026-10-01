import { useState, useEffect, useRef } from 'react'
import './GrowthSection.css'

export const FEATURES = [
  // Top Row Cards
  {
    id: 'performance-creatives',
    row: 'top',
    title: 'PERFORMANCE CREATIVES',
    tabTitle: 'PERFORMANCE\nCREATIVES',
    description:
      "Access Vidrow's high-velocity ads creative engine, trained on 1000Cr+ of ad spends, delivering the highest win rate across the industry.",
    tiles: [
      { id: 'pc-1', gridRow: 0, gridCol: 0, localRow: 0, localCol: 0, color: '#eaf16b' }, // light lemon
      { id: 'pc-2', gridRow: 1, gridCol: 0, localRow: 1, localCol: 0, color: '#f3ce3c' }, // gold yellow
      { id: 'pc-3', gridRow: 1, gridCol: 1, localRow: 1, localCol: 1, color: '#faf5b4' }, // pastel cream
    ],
  },
  {
    id: 'brand-marketing',
    row: 'top',
    title: 'BRAND MARKETING',
    tabTitle: 'BRAND\nMARKETING',
    description:
      'Create celebrity-led brand marketing campaigns, built for virality and conceptualised for standing out.',
    tiles: [
      { id: 'bm-1', gridRow: 0, gridCol: 1, localRow: 0, localCol: 0, color: '#695bd6' }, // purple
      { id: 'bm-2', gridRow: 0, gridCol: 2, localRow: 0, localCol: 1, color: '#695bd6' }, // purple
    ],
  },
  {
    id: 'celebrity-performance',
    row: 'top',
    title: 'CELEBRITY PERFORMANCE CREATIVES',
    tabTitle: 'CELEBRITY PERFORMANCE\nCREATIVES',
    mobileTitle: 'CELEBRITY\nPERFORMANCE\nCREATIVES',
    description:
      'Unlock 200+ tested celebrity faces for conversion-led campaigns to 3X your user acquisition.',
    tiles: [
      { id: 'cpc-1', gridRow: 0, gridCol: 3, localRow: 0, localCol: 1, color: '#695bd6' }, // purple (top-right)
      { id: 'cpc-2', gridRow: 1, gridCol: 2, localRow: 1, localCol: 0, color: '#695bd6' }, // purple (bottom-left)
      { id: 'cpc-3', gridRow: 1, gridCol: 3, localRow: 1, localCol: 1, color: '#695bd6' }, // purple (bottom-right)
    ],
  },

  // Bottom Row Cards
  {
    id: 'social-media',
    row: 'bottom',
    title: 'SOCIAL MEDIA MARKETING',
    tabTitle: 'SOCIAL MEDIA\nMARKETING',
    description:
      "Build your niche, go viral and introduce a layer of social media validation through Vidrow's social media retainers.",
    tiles: [
      { id: 'smm-1', gridRow: 2, gridCol: 0, localRow: 0, localCol: 0, color: '#695bd6' }, // purple
      { id: 'smm-2', gridRow: 2, gridCol: 1, localRow: 0, localCol: 1, color: '#695bd6' }, // purple
      { id: 'smm-3', gridRow: 3, gridCol: 0, localRow: 1, localCol: 0, color: '#695bd6' }, // purple
      { id: 'smm-4', gridRow: 3, gridCol: 1, localRow: 1, localCol: 1, color: '#695bd6' }, // purple
    ],
  },
  {
    id: 'ads-management',
    row: 'bottom',
    title: 'ADS ACCOUNT MANAGEMENT',
    tabTitle: 'ADS ACCOUNT\nMANAGEMENT',
    description:
      "Bring best practices in Google and Meta ads management with Vidrow's data and tech driven approach.",
    tiles: [
      { id: 'aam-1', gridRow: 2, gridCol: 2, localRow: 0, localCol: 0, color: '#f3ce3c' }, // gold yellow
      { id: 'aam-2', gridRow: 3, gridCol: 2, localRow: 1, localCol: 0, color: '#eaf16b' }, // light lemon
      { id: 'aam-3', gridRow: 3, gridCol: 3, localRow: 1, localCol: 1, color: '#faf5b4' }, // pastel cream
    ],
  },
  {
    id: 'ai-marketing',
    row: 'bottom',
    title: 'AI FOR MARKETING',
    tabTitle: 'AI FOR\nMARKETING',
    description:
      "Plug and play with Vidrow's proprietary AI video ads tool, 'Double Down', built for scaling your winning ads at lower cost and faster TAT.",
    tiles: [
      { id: 'aim-1', gridRow: 2, gridCol: 3, localRow: 0, localCol: 0, color: '#695bd6' }, // purple
    ],
  },
]

const ALL_TILES = FEATURES.flatMap((f) =>
  f.tiles.map((t) => ({ ...t, cardId: f.id }))
)

export default function GrowthSection() {
  const containerRef = useRef(null)
  const gridContainerRef = useRef(null)
  const cardTargetRefs = useRef({})

  const [scrollProgress, setScrollProgress] = useState(0)
  const [flightDeltas, setFlightDeltas] = useState({})
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const isTablet = windowWidth <= 768

  // Fluid responsive metrics ensuring headline and 4x4 grid fit within any screen width
  const getResponsiveMetrics = (width) => {
    if (width <= 480) {
      return { tileSize: 30, tileGap: 2.2, sideMargin: 10, minSlot: 14 }
    } else if (width <= 768) {
      return { tileSize: 40, tileGap: 2.5, sideMargin: 14, minSlot: 16 }
    } else if (width <= 1024) {
      // Laptop-1024 / Tablet landscape: calibrated with optimal breathing room
      return { tileSize: 34, tileGap: 2, sideMargin: 20, minSlot: 22 }
    } else if (width >= 2000) {
      // 4K & Ultra-wide (2560px+): scaled up for large high-res displays
      return { tileSize: 64, tileGap: 4, sideMargin: 44, minSlot: 62 }
    } else {
      // Large Desktop (1025px - 1999px): calibrated for perfect optical kerning of hyphen
      return { tileSize: 42, tileGap: 2.5, sideMargin: 26, minSlot: 36 }
    }
  }

  const { tileSize, tileGap, sideMargin, minSlot } = getResponsiveMetrics(windowWidth)
  const step = tileSize + tileGap
  const gridDimension = 4 * tileSize + 3 * tileGap

  // --------------------------------------------------------------------------
  // Step 1: Calculate Flight Vectors from Central 4x4 Grid to Card Targets
  // --------------------------------------------------------------------------
  const calculateFlightVectors = () => {
    if (!gridContainerRef.current) return

    const gridRect = gridContainerRef.current.getBoundingClientRect()
    const newDeltas = {}

    ALL_TILES.forEach((tile) => {
      const startX = gridRect.left + tile.gridCol * step
      const startY = gridRect.top + tile.gridRow * step

      const cardEl = cardTargetRefs.current[tile.cardId]
      if (!cardEl) return

      const cardRect = cardEl.getBoundingClientRect()
      const endX = cardRect.left + tile.localCol * step
      const endY = cardRect.top + tile.localRow * step

      newDeltas[tile.id] = {
        x: endX - startX,
        y: endY - startY,
      }
    })

    setFlightDeltas(newDeltas)
  }

  // --------------------------------------------------------------------------
  // Step 2: Track scroll progress and window resize
  // --------------------------------------------------------------------------
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const currentScroll = -rect.top
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1)
      setScrollProgress(rawProgress)
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      calculateFlightVectors()
      handleScroll()
    }

    calculateFlightVectors()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    const timer = setTimeout(calculateFlightVectors, 150)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [gridDimension, step, windowWidth])

  // --------------------------------------------------------------------------
  // Step 3: Smooth progress curve
  // --------------------------------------------------------------------------
  let animProgress = 0
  if (scrollProgress <= 0.08) {
    animProgress = 0
  } else if (scrollProgress >= 0.92) {
    animProgress = 1
  } else {
    const normalized = (scrollProgress - 0.08) / (0.92 - 0.08)
    animProgress = normalized * normalized * (3 - 2 * normalized)
  }

  // Symmetrical slot width: holds the 4x4 grid at start, smoothly shrinks to hyphen
  const maxSlotWidth = gridDimension + sideMargin * 2
  const currentSlotWidth = minSlot + (1 - animProgress) * (maxSlotWidth - minSlot)

  // Hyphen ONLY appears when the words have virtually met (no mid-air floating hyphen)
  const hyphenOpacity = Math.max(0, Math.min(1, (animProgress - 0.78) / 0.2))

  // Badge floats down into place
  const badgeOpacity = Math.max(0, Math.min(1, (animProgress - 0.3) / 0.5))
  const badgeY = (1 - animProgress) * -14

  // Card text ONLY fades in as the tiles arrive at their card slots
  const textOpacity = Math.max(0, Math.min(1, (animProgress - 0.72) / 0.25))
  const textY = (1 - textOpacity) * 8

  const topCards = FEATURES.filter((f) => f.row === 'top')
  const bottomCards = FEATURES.filter((f) => f.row === 'bottom')
  const scrollDownOffset = windowWidth <= 480 ? 30 : 85

  return (
    <section className="growth-section" ref={containerRef}>
      <div className="growth-viewport">
        {/* ---------------- Top 3 Feature Cards ---------------- */}
        <div className="cards-row cards-row-top">
          {topCards.map((feature) => (
            <div key={feature.id} className={`feature-card card-${feature.id}`}>
              <div
                className="tile-cluster-placeholder"
                ref={(el) => (cardTargetRefs.current[feature.id] = el)}
              />

              <div
                className="card-content"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textY}px)`,
                }}
              >
                <h3 className="card-title">
                  {isTablet && feature.tabTitle ? feature.tabTitle : feature.title}
                </h3>
                <p className="card-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- Center Headline & Central 4x4 Grid ---------------- */}
        <div className="center-headline-container">
          {isTablet ? (
            /* Tablet Stacked Headline (scrolls down to center) + Grid Below */
            <div className="tab-headline-lockup">
              {/* Animated Text Block: scrolls down from -85px/-60px to 0px (coming to vertical center) */}
              <div
                className="tab-text-block"
                style={{
                  transform: `translate3d(0, ${(1 - animProgress) * -scrollDownOffset}px, 0)`,
                }}
              >
                {/* "The levers" Badge */}
                <div className="levers-badge">
                  <span className="badge-text">The levers</span>
                  <div className="corner-pixel-icon" aria-hidden="true">
                    <div className="pixel-row">
                      <span className="pixel-box" />
                      <span className="pixel-box" />
                      <span className="pixel-box" />
                    </div>
                    <div className="pixel-row">
                      <span className="pixel-box empty" />
                      <span className="pixel-box" />
                      <span className="pixel-box" />
                    </div>
                    <div className="pixel-row">
                      <span className="pixel-box empty" />
                      <span className="pixel-box empty" />
                      <span className="pixel-box" />
                    </div>
                  </div>
                </div>

                <div className="tab-headline">
                  <div className="tab-headline-line">Unlock high</div>
                  <div className="tab-headline-line">velocity growth.</div>
                </div>
              </div>

              {/* Central 4x4 Grid Container (Stationary below initial text position) */}
              <div
                ref={gridContainerRef}
                className="central-grid-4x4 tab-grid-4x4"
                style={{
                  width: `${gridDimension}px`,
                  height: `${gridDimension}px`,
                  pointerEvents: 'none',
                }}
              >
                {ALL_TILES.map((tile) => {
                  const delta = flightDeltas[tile.id] || { x: 0, y: 0 }
                  const translateX = delta.x * animProgress
                  const translateY = delta.y * animProgress

                  return (
                    <div
                      key={tile.id}
                      className="mosaic-tile"
                      style={{
                        backgroundColor: tile.color,
                        width: `${tileSize}px`,
                        height: `${tileSize}px`,
                        top: `${tile.gridRow * step}px`,
                        left: `${tile.gridCol * step}px`,
                        transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                      }}
                    />
                  )
                })}
              </div>
            </div>
          ) : (
            /* Desktop/Laptop (Unchanged) */
            <>
              <div
                className="levers-badge"
                style={{
                  opacity: badgeOpacity,
                  transform: `translateY(${badgeY}px)`,
                }}
              >
                <span className="badge-text">THE LEVERS</span>
                <div className="corner-pixel-icon" aria-hidden="true">
                  <div className="pixel-row">
                    <span className="pixel-box" />
                    <span className="pixel-box" />
                    <span className="pixel-box" />
                  </div>
                  <div className="pixel-row">
                    <span className="pixel-box empty" />
                    <span className="pixel-box" />
                    <span className="pixel-box" />
                  </div>
                  <div className="pixel-row">
                    <span className="pixel-box empty" />
                    <span className="pixel-box empty" />
                    <span className="pixel-box" />
                  </div>
                </div>
              </div>

              <div className="headline-lockup">
                <div className="headline-side headline-side-left">
                  <span className="headline-text">Unlock high</span>
                </div>

                <div
                  className="headline-center-slot"
                  style={{
                    width: `${currentSlotWidth}px`,
                  }}
                >
                  <div
                    ref={gridContainerRef}
                    className="central-grid-4x4"
                    style={{
                      width: `${gridDimension}px`,
                      height: `${gridDimension}px`,
                      pointerEvents: 'none',
                    }}
                  >
                    {ALL_TILES.map((tile) => {
                      const delta = flightDeltas[tile.id] || { x: 0, y: 0 }
                      const translateX = delta.x * animProgress
                      const translateY = delta.y * animProgress

                      return (
                        <div
                          key={tile.id}
                          className="mosaic-tile"
                          style={{
                            backgroundColor: tile.color,
                            width: `${tileSize}px`,
                            height: `${tileSize}px`,
                            top: `${tile.gridRow * step}px`,
                            left: `${tile.gridCol * step}px`,
                            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                          }}
                        />
                      )
                    })}
                  </div>

                  <span
                    className="headline-hyphen"
                    style={{
                      opacity: hyphenOpacity,
                    }}
                  >
                    -
                  </span>
                </div>

                <div className="headline-side headline-side-right">
                  <span className="headline-text">velocity growth.</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ---------------- Bottom 3 Feature Cards ---------------- */}
        <div className="cards-row cards-row-bottom">
          {bottomCards.map((feature) => (
            <div key={feature.id} className={`feature-card card-${feature.id}`}>
              <div
                className="tile-cluster-placeholder"
                ref={(el) => (cardTargetRefs.current[feature.id] = el)}
              />

              <div
                className="card-content"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textY}px)`,
                }}
              >
                <h3 className="card-title">
                  {isTablet && feature.tabTitle ? feature.tabTitle : feature.title}
                </h3>
                <p className="card-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
