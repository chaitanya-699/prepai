import { Outlet } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function PublicLayout() {
  return (
    <>
      <div className="page-noise" aria-hidden="true" />
      <div className="announcement">
        <span className="spark">✦</span>
        <span>Built for learners who want more than a question bank.</span>
        {/* <Link to="/#how-it-works">See how it works →</Link> */}
      </div>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  )
}
