import './Footer.css'

function Footer() {
  return (
    <footer className="wm-footer" id="contact">
      <div className="wm-footer-container">
        {/* Top Hero CTA: WANT TO COLLABORATE? LET'S TALK */}
        <div className="wm-footer-hero">
          <span className="wm-footer-eyebrow">WANT TO COLLABORATE?</span>
          <h2 className="wm-footer-title">LET’S TALK</h2>

          <a
            href="mailto:team@wondermakers.digital?subject=Project%20Inquiry"
            className="wm-footer-cta-btn"
            aria-label="Open contact form"
          >
            <span className="wm-footer-cta-text">Contact form</span>
            <span className="wm-footer-cta-arrow" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </a>
        </div>

        {/* Middle Info Columns (3 Columns: Ask, Visit, Socials) */}
        <div className="wm-footer-info-grid">
          {/* Column 1: Want to ask something? */}
          <div className="wm-footer-col">
            <span className="wm-footer-col-label">WANT TO ASK SOMETHING?</span>
            <a
              href="mailto:team@wondermakers.digital"
              className="wm-footer-link wm-footer-email"
            >
              team@wondermakers.digital
            </a>
            <a href="tel:+420603410127" className="wm-footer-link wm-footer-phone">
              +420 603 410 127
            </a>
          </div>

          {/* Column 2: Want to visit us? */}
          <div className="wm-footer-col">
            <span className="wm-footer-col-label">WANT TO VISIT US?</span>
            <address className="wm-footer-address">
              <span>Mezibranska 1668/5, New town</span>
              <span>1110 00 Prague 1</span>
              <span>Czech Republic</span>
            </address>
          </div>

          {/* Column 3: Stay in the loop (Social Links) */}
          <div className="wm-footer-col wm-footer-col-social">
            <span className="wm-footer-col-label">STAY IN THE LOOP</span>
            <div className="wm-footer-social-cluster" aria-label="Social media links">
              {/* Row 1 */}
              <div className="wm-footer-social-row">
                {/* Dribbble */}
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-footer-social-btn"
                  aria-label="Dribbble"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.118 11.105c-.378-.083-2.921-.611-5.83.808-.324-.702-.663-1.404-1.02-2.102 3.09-1.523 5.342-3.722 6.523-6.381 1.74 2.128 3.209 4.802 3.209 7.425 0 .083 0 .166-.008.248-.076.012-.133.016-.123.016zm-7.904-8.875c1.944 1.488 3.488 3.447 4.457 5.753-1.077 2.378-3.085 4.341-5.838 5.702-1.028-2.259-2.339-4.305-3.901-6.109.957-.996 2.146-1.597 3.282-1.597.71 0 1.385.093 2 .251zm-5.419 2.508c1.472 1.706 2.707 3.639 3.684 5.775-2.671 1.054-5.655 1.309-8.948.749 1.112-2.775 3.048-5.006 5.264-6.524zm-3.877 9.873c3.551.606 6.772.334 9.664-.789.294.595.57 1.196.822 1.802-3.336 2.217-6.136 5.244-8.388 9.091-1.397-1.954-2.228-4.324-2.228-6.885 0-1.121.16-2.206.467-3.219l-.337-.063zm7.842 7.828c2.053-3.526 4.608-6.305 7.662-8.341.979 2.293 1.515 4.829 1.515 7.487 0 .284-.019.566-.053.847-2.529 2.222-5.811 3.567-9.398 3.567-.323 0-.643-.011-.96-.034.407-1.164.832-2.348 1.234-3.526z" />
                  </svg>
                </a>

                {/* Behance */}
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-footer-social-btn"
                  aria-label="Behance"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h5.165c-.139-2.074-2.095-2.222-2.585-2.222-.596 0-2.316.279-2.58 2.222zM8.358 17.275H5.28v-4.103h3.078c1.077 0 1.936.31 1.936 2.051 0 1.742-.859 2.052-1.936 2.052zm0-6.177H5.28V7.3h3.078c.957 0 1.777.307 1.777 1.899 0 1.592-.82 1.899-1.777 1.899zm5.078 4.126c0-1.849-.933-2.671-2.092-2.923 1.011-.32 1.644-1.229 1.644-2.588 0-2.617-1.956-3.713-4.63-3.713H1.28v16h7.078c2.674 0 5.078-1.096 5.078-3.776z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-footer-social-btn"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>

              {/* Row 2 */}
              <div className="wm-footer-social-row">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-footer-social-btn"
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>

                {/* X (formerly Twitter) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-footer-social-btn"
                  aria-label="X (formerly Twitter)"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Metadata Bar */}
        <div className="wm-footer-bottom">
          <div className="wm-footer-bottom-left">
            <a
              href="https://maps.google.com/?q=Mezibranska+1668/5+11000+Prague"
              target="_blank"
              rel="noopener noreferrer"
              className="wm-footer-map-link"
            >
              Map
            </a>
            <span className="wm-footer-map-address">
              Mezibranska 1668/5 New Town, 110 00 Prague 1, Czech Republic
            </span>
          </div>

          <div className="wm-footer-bottom-right">
            <a href="#privacy" className="wm-footer-meta-link">
              Privacy policy
            </a>
            <a href="#cookies" className="wm-footer-meta-link">
              Cookies
            </a>
            <span className="wm-footer-meta-tag">ICO: 17844576</span>
            <span className="wm-footer-meta-tag">DIC: CZ17844576</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
