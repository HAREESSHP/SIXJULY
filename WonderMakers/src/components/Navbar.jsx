import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const [theme, setTheme] = useState('light')
  const [activeLink, setActiveLink] = useState('Home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const navItems = ['Home', 'Work', 'Services', 'About', 'Wonder Games']

  return (
    <header className="wm-navbar-wrapper">
      <div className="wm-navbar-glow"></div>

      <div className="wm-navbar-container">
        <a href="#home" className="wm-brand">
          <svg className="wm-star-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
          </svg>
          <span className="wm-brand-name">Wonder Makers</span>
        </a>

        <div className="wm-theme-switcher" role="radiogroup" aria-label="Theme Selector">
          <button
            type="button"
            className={`wm-theme-btn ${theme === 'light' ? 'active-light' : ''}`}
            onClick={() => setTheme('light')}
          >
            Light
          </button>
          <button
            type="button"
            className={`wm-theme-btn ${theme === 'dark' ? 'active-dark' : ''}`}
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
        </div>
        <nav className="wm-nav-links">
          {navItems.map((item) => {
            const isActive = activeLink === item
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`wm-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setActiveLink(item)}
              >
                {isActive && (
                  <svg className="wm-active-star" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
                  </svg>
                )}
                <span>{item}</span>
              </a>
            )
          })}
        </nav>
        <div className="wm-navbar-right">
          <a href="#contact" className="wm-cta-button">
            <span className="wm-cta-text">Let's talk</span>
            <span className="wm-cta-arrow-circle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </a>
          <button
            type="button"
            className="wm-mobile-toggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`wm-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`wm-bar ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="wm-mobile-menu">
          <div className="wm-mobile-theme-switch">
            <span className="wm-mobile-label">Theme:</span>
            <div className="wm-theme-switcher small">
              <button
                type="button"
                className={`wm-theme-btn ${theme === 'light' ? 'active-light' : ''}`}
                onClick={() => setTheme('light')}
              >
                Light
              </button>
              <button
                type="button"
                className={`wm-theme-btn ${theme === 'dark' ? 'active-dark' : ''}`}
                onClick={() => setTheme('dark')}
              >
                Dark
              </button>
            </div>
          </div>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`wm-mobile-link ${activeLink === item ? 'active' : ''}`}
              onClick={() => {
                setActiveLink(item)
                setIsMobileMenuOpen(false)
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="wm-cta-button full-width"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="wm-cta-text">Let's talk</span>
            <span className="wm-cta-arrow-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </a>
        </div>
      )}
    </header>
  )
}

export default Navbar
