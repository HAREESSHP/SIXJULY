import avaxVisual from '../assets/projects/avax-visual.png'
import dimensoVisual from '../assets/projects/dimenso-visual.png'
import sphereVisual from '../assets/projects/sphere-visual.png'
import eppiVisual from '../assets/projects/eppi-visual.png'
import ubisoftVisual from '../assets/projects/ubisoft-visual.png'
import './Work.css'

const SECONDARY_PROJECTS = [
  {
    id: 'dimenso-student',
    title: 'DIMENSO STUDENT',
    badge: 'Mobile App',
    image: dimensoVisual,
    alt: 'Dimenso Student Mobile App Showcase',
    link: '#',
  },
  {
    id: 'sphere-concept',
    title: 'SPHERE - DESIGN CONCEPT',
    badge: 'Immersive Website',
    image: sphereVisual,
    alt: 'Sphere Design Concept Showcase',
    link: '#',
  },
  {
    id: 'eppi-storefront',
    title: 'EPPI',
    badge: 'Premium Storefront',
    image: eppiVisual,
    alt: 'Eppi Jewelry Workshop Storefront',
    link: '#',
  },
  {
    id: 'ubisoft-fates',
    title: 'UBISOFT MIGHT & MAGIC FATES',
    badge: 'Web3 App',
    image: ubisoftVisual,
    alt: 'Ubisoft Might & Magic Fates Game Showcase',
    link: '#',
  },
]

function Work() {
  return (
    <section className="wm-work-section" id="work">
      {/* Background Atmosphere */}
      <div className="wm-work-glow-top" />
      <div className="wm-work-glow-bottom" />

      <div className="wm-work-container">
        {/* Header Block */}
        <div className="wm-work-header">
          <h2 className="wm-work-main-title">WORK</h2>
          <h3 className="wm-work-tagline">Award-winning craft, technical reliability.</h3>
          <p className="wm-work-description">
            Recognized by platforms like Awwwards for visual excellence, our work is built to meet the technical demands of industry-leading brands.
          </p>
        </div>

        {/* Feature Project Showcase Card (AVAX) */}
        <div className="wm-featured-card">
          <div className="wm-card-media-wrap">
            <img
              src={avaxVisual}
              alt="AVAX.NETWORK Showcase"
              className="wm-card-image"
              loading="lazy"
            />
          </div>

          <div className="wm-card-bottom-bar">
            <span className="wm-card-title">AVAX.NETWORK</span>
            <a
              href="https://avax.network"
              target="_blank"
              rel="noopener noreferrer"
              className="wm-card-badge"
            >
              Company Website
            </a>
          </div>
        </div>

        {/* 2x2 Secondary Projects Grid */}
        <div className="wm-projects-grid">
          {SECONDARY_PROJECTS.map((project) => (
            <article key={project.id} className="wm-grid-card">
              <div className="wm-grid-card-media">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="wm-grid-card-img"
                  loading="lazy"
                />
              </div>

              <div className="wm-grid-card-bottom-bar">
                <span className="wm-grid-card-title">{project.title}</span>
                <a
                  href={project.link}
                  className="wm-card-badge"
                  onClick={(e) => {
                    if (project.link === '#') e.preventDefault()
                  }}
                >
                  {project.badge}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* SEE ALL WORK Banner */}
        <a href="#all-work" className="wm-all-work-banner">
          <span className="wm-all-work-title">SEE ALL WORK</span>
          <div className="wm-all-work-btn" aria-label="Explore all work">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </a>
      </div>
    </section>
  )
}

export default Work
