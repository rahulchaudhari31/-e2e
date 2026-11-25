import { useEffect, useState } from 'react'
import { content } from '../data/content.js'
import PageHeader from '../components/sections/PageHeader.jsx'
import ServiceAccordion from '../components/sections/ServiceAccordion.jsx'
import FooterCta from '../components/sections/FooterCta.jsx'
import Container from '../components/ui/Container.jsx'
import TornDivider from '../components/ui/TornDivider.jsx'
import styles from './Services.module.css'

const serviceNav = content.navigation.find((item) => item.groups)
const placeholderTitles = new Set(['CREATIVE', 'Single Service 3', 'Services 2'])

const groups = serviceNav.groups.map((group) => {
  const slugs = new Set([group.slug, ...group.children.map((child) => child.slug)])
  const services = content.servicePages.filter(
    (service) => slugs.has(service.slug) && !placeholderTitles.has(service.title),
  )

  return {
    id: group.slug.replace(/\W/g, '-'),
    label: group.label,
    services,
  }
})

export default function Services() {
  const [active, setActive] = useState(groups[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0 },
    )

    groups.forEach((group) => {
      const element = document.getElementById(group.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const goToGroup = (id) => {
    setActive(id)
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
  }

  return (
    <>
      <PageHeader
        title={serviceNav.label}
        subtitle={content.home.intro.heading}
        breadcrumbs={['Home', 'Services']}
        eyebrow={content.meta.siteName}
      />

      <TornDivider color="var(--lilac)" />
      <section className={styles.section}>
        <Container className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Service categories">
            <span className={styles.sidebarTitle}>Categories</span>
            {groups.map((group) => (
              <button
                aria-current={active === group.id ? 'true' : undefined}
                className={`${styles.navButton} ${active === group.id ? styles.active : ''}`.trim()}
                key={group.id}
                onClick={() => goToGroup(group.id)}
                type="button"
              >
                {group.label}
              </button>
            ))}
          </aside>

          <div className={styles.content}>
            {groups.map((group, index) => (
              <section className={styles.group} id={group.id} key={group.id}>
                <div className={styles.groupHeader}>
                  <span className={styles.groupNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{group.label}</h2>
                </div>
                <p className={styles.groupLead}>{content.home.intro.body[0]}</p>
                <ServiceAccordion items={group.services} initialOpen={index === 0 ? 0 : -1} />
              </section>
            ))}
          </div>
        </Container>
      </section>

      <TornDivider color="var(--sun)" />
      <FooterCta />
    </>
  )
}
