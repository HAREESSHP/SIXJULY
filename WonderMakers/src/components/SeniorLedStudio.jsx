import studioDog from '../assets/projects/studio-dog.jpg'
import studioDev from '../assets/projects/studio-dev.jpg'
import studioNeon from '../assets/projects/studio-neon.jpg'
import studioCollab from '../assets/projects/studio-collab.jpg'
import './SeniorLedStudio.css'

function YellowStickerStar() {
  return (
    <div className="wm-studio-center-badge" aria-hidden="true">
      <svg
        className="wm-studio-badge-svg"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="badgeShadowYellow" x="0" y="0" width="80" height="80" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.25" />
          </filter>
          <linearGradient id="badgePaperYellow" x1="8" y1="8" x2="72" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f5ff47" />
            <stop offset="55%" stopColor="#d8ff05" />
            <stop offset="100%" stopColor="#bbee00" />
          </linearGradient>
        </defs>

        {/* Circular Sticker Base in Vibrant Lime-Yellow */}
        <circle cx="40" cy="40" r="37" fill="url(#badgePaperYellow)" stroke="rgba(0, 0, 0, 0.08)" strokeWidth="1" />

        {/* Realistic Wrinkles & Creases */}
        <path d="M14 28 C26 36, 42 24, 66 36" stroke="rgba(0, 0, 0, 0.14)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M20 56 C32 48, 48 60, 64 50" stroke="rgba(0, 0, 0, 0.12)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M38 8 C35 28, 44 44, 40 72" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Center 4-Pointed Sparkle Star */}
        <path
          d="M40 16 L44.5 35.5 L64 40 L44.5 44.5 L40 64 L35.5 44.5 L16 40 L35.5 35.5 Z"
          fill="#111111"
        />
      </svg>
    </div>
  )
}

function SeniorLedStudio() {
  return (
    <section className="wm-studio-section" id="studio">
      {/* Full-Screen Title Hero Block */}
      <div className="wm-studio-hero-full">
        {/* Main 2-Line Heading with Centered Sticker */}
        <div className="wm-studio-hero-title">
          <span className="wm-studio-line wm-studio-line-1">SENIOR-LED</span>

          {/* Centered Yellow Sticker Badge */}
          <div className="wm-studio-badge-wrapper">
            <YellowStickerStar />
          </div>

          <span className="wm-studio-line wm-studio-line-2">STUDIOS</span>
        </div>

        {/* Subtext underneath */}
        <div className="wm-studio-subtext-container">
          <p className="wm-studio-subtext">
            Proven expertise and global reach. Our senior-led team brings over a decade of design and engineering experience to every product we build.
          </p>
        </div>
      </div>

      <div className="wm-studio-container">
        {/* 8-Card Bento Grid */}
        <div className="wm-studio-bento">
          {/* Row 1 - Card 1: 11+ Years (Solid Black) */}
          <article className="wm-bento-card wm-bento-stat wm-bento-black">
            <span className="wm-bento-num">11+</span>
            <p className="wm-bento-label">
              years in digital design &amp; development
            </p>
          </article>

          {/* Row 1 - Card 2: Photo (Designer with dog on sofa) */}
          <article className="wm-bento-card wm-bento-photo">
            <img
              src={studioDog}
              alt="Senior studio team member with dog on couch"
              className="wm-bento-img"
              loading="lazy"
            />
          </article>

          {/* Row 1 - Card 3: 20+ Inhouse Experts (Lime-Dark Gradient) */}
          <article className="wm-bento-card wm-bento-stat wm-bento-gradient">
            <span className="wm-bento-num">20+</span>
            <p className="wm-bento-label">inhouse experts</p>
          </article>

          {/* Row 1 - Card 4: Photo (Developer at studio desk) */}
          <article className="wm-bento-card wm-bento-photo">
            <img
              src={studioDev}
              alt="Engineer coding at agency desk"
              className="wm-bento-img"
              loading="lazy"
            />
          </article>

          {/* Row 2 - Card 5: Photo (Neon W light sign) */}
          <article className="wm-bento-card wm-bento-photo">
            <img
              src={studioNeon}
              alt="Designer adjusting yellow neon W studio sign"
              className="wm-bento-img"
              loading="lazy"
            />
          </article>

          {/* Row 2 - Card 6: 150+ Projects (Clean White) */}
          <article className="wm-bento-card wm-bento-stat wm-bento-white">
            <span className="wm-bento-num">150+</span>
            <p className="wm-bento-label">projects delivered</p>
          </article>

          {/* Row 2 - Card 7: Photo (Team meeting and collaboration) */}
          <article className="wm-bento-card wm-bento-photo">
            <img
              src={studioCollab}
              alt="Creative team smiling and collaborating at conference table"
              className="wm-bento-img"
              loading="lazy"
            />
          </article>

          {/* Row 2 - Card 8: 4 Continents (Vibrant Lime) */}
          <article className="wm-bento-card wm-bento-stat wm-bento-lime">
            <span className="wm-bento-num">4</span>
            <p className="wm-bento-label">continents covered</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default SeniorLedStudio
