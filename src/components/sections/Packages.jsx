import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import PillTabs from '../ui/PillTabs.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import styles from './Packages.module.css'

const tabs = [
  {
    label: 'Design and development',
    slugs: [
      'web-design.php',
      'design-and-development.php',
      'development.php',
      'mobile-app-desig-and-development.php',
      'ecommerce-websites.php',
      'cms.php',
      'wordpress-websites.php',
      'website-management.php',
    ],
  },
  {
    label: 'Digital marketing',
    slugs: [
      'digital-marketing.php',
      'digital-strategy.php',
      'seo.php',
      'analytics-or-growth-marketing.php',
      'ppc-management.php',
      'social-media.php',
      'email-marketing.php',
    ],
  },
  {
    label: 'Video',
    slugs: ['videos.php', 'creative.php', 'branding.php', 'content-writing.php', 'graphic-design.php'],
  },
].map((tab) => {
  const items = tab.slugs
    .map((slug) => content.servicePages.find((service) => service.slug === slug))
    .filter(Boolean)
    .map((service) => ({
      title: service.title,
      description: service.subtitle,
      route: service.route,
    }))

  return {
    label: tab.label,
    content: <PackageGrid key={tab.label} items={items} />,
  }
})

function PackageGrid({ items }) {
  const gridRef = useRef(null)
  const [ready, setReady] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const shouldPlay = useRef(!ready)

  useEffect(() => {
    if (!shouldPlay.current || !gridRef.current) {
      return undefined
    }

    const cards = gridRef.current.querySelectorAll('[data-package-card]')
    const tween = gsap.fromTo(
      cards,
      { y: -90, rotation: -8, scale: 0.9, opacity: 0 },
      {
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.65,
        ease: 'bounce.out',
        stagger: 0.08,
        onComplete: () => setReady(true),
      },
    )

    return () => tween.kill()
  }, [])

  return (
    <div ref={gridRef} className={`${styles.grid} ${ready ? '' : styles.pending}`.trim()}>
      {items.map((item, index) => (
        <div className={styles.cardWrap} data-package-card key={item.title}>
          <TiltCard>
            <Link className={styles.card} to={item.route}>
              <div className={styles.cardTop}>
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardBody}>{item.description}</p>
            </Link>
          </TiltCard>
        </div>
      ))}
    </div>
  )
}

export default function Packages() {
  return (
    <section className={styles.section}>
      <Container>
        <span className={styles.eyebrow}>{content.meta.siteName}</span>
        <h2 className={styles.title}>Pick your package</h2>
        <p className={styles.lead}>{content.home.intro.body}</p>
        <PillTabs tabs={tabs} />
      </Container>
    </section>
  )
}
