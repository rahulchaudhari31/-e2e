import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { content, routeAliases } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import styles from './ServiceGrid.module.css'

function resolveRoute(item) {
  if (item.route) {
    return item.route
  }

  const slug = item.originalHref?.split('/').pop()
  return (slug && (content.routeBySlug[slug] || routeAliases[slug])) || '/services'
}

export default function ServiceGrid({ eyebrow, title, items = [], className = '' }) {
  return (
    <section className={`${styles.section} ${className}`.trim()}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <div className={styles.grid}>
          {items.map((item, index) => (
            <Reveal className={styles.cardWrap} key={`${item.title}-${index}`} delay={(index % 3) * 0.08}>
              <TiltCard>
                <Link className={styles.card} to={resolveRoute(item)}>
                  <div className={styles.cardTop}>
                    <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </div>

                  {item.image ? (
                    <div className={styles.image}>
                      <LazyImage alt={`${item.title} service image from the original site`} src={item.image} />
                    </div>
                  ) : null}

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardBody}>{item.description}</p>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
