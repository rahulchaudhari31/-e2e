import { Suspense, useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Outlet, useLocation } from 'react-router-dom'
import { useLenis } from '../../hooks/useLenis.js'
import CustomCursor from '../ui/CustomCursor.jsx'
import RouteFallback from '../ui/RouteFallback.jsx'
import Seo from '../seo/Seo.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import PageTransition from './PageTransition.jsx'
import ScrollProgress from './ScrollProgress.jsx'
import styles from './Layout.module.css'

export default function Layout() {
  const location = useLocation()
  const scrollToTop = useLenis()

  useEffect(() => {
    scrollToTop()
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    const focusTimer = window.setTimeout(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }, 480)

    return () => {
      window.clearTimeout(refreshTimer)
      window.clearTimeout(focusTimer)
    }
  }, [location.pathname, scrollToTop])

  return (
    <div className={styles.shell}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Seo />
      <Header key={location.pathname} />
      <PageTransition routeKey={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </PageTransition>
      <Footer />
    </div>
  )
}
