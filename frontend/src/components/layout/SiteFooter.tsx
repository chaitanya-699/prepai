import { Link } from 'react-router-dom'
import '../../styles/shared/brand.css'
import '../../styles/layout/site-footer.css'

export function SiteFooter() {
  return (
    <footer className="shell site-footer">
      <div className="footer-main">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 6.5 12 2l9 4.5v11L12 22l-9-4.5v-11Z" />
              <path d="m3 6.5 9 5 9-5M12 11.5V22" />
            </svg>
          </span>
          PrepAi
        </Link>
        <div className="footer-links">
          <Link to="/#features">Features</Link>
          <Link to="/#subjects">Subjects</Link>
          <Link to="/#how-it-works">How it works</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 PrepAi. Made for serious learners.</span>
        <span>Technical confidence, on demand.</span>
      </div>
    </footer>
  )
}
