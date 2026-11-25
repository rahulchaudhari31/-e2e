import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import Modal from '../ui/Modal.jsx'
import styles from './PortfolioGrid.module.css'

const filters = ['All', 'Web', 'App', 'Marketing', 'Video']
const categorySlugs = {
  Web: [
    'web-design.php',
    'development.php',
    'ecommerce-websites.php',
    'cms.php',
    'wordpress-websites.php',
    'website-management.php',
  ],
  App: ['mobile-app-desig-and-development.php'],
  Marketing: [
    'digital-marketing.php',
    'digital-strategy.php',
    'seo.php',
    'analytics-or-growth-marketing.php',
    'ppc-management.php',
    'social-media.php',
    'email-marketing.php',
  ],
  Video: ['videos.php', 'creative.php', 'branding.php', 'content-writing.php', 'graphic-design.php'],
}

const projects = content.servicePages
  .map((service) => {
    const category = Object.keys(categorySlugs).find((key) => categorySlugs[key].includes(service.slug))
    return category ? { ...service, category } : null
  })
  .filter(Boolean)

export default function PortfolioGrid() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const reduceMotion = useReducedMotion()
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter)
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <section className={styles.section}>
        <Container>
          <div className={styles.chips} role="group" aria-label="Filter projects">
            {filters.map((option) => (
              <button
                aria-pressed={filter === option}
                className={`${styles.chip} ${filter === option ? styles.active : ''}`.trim()}
                key={option}
                onClick={() => setFilter(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>
          <span className={styles.srOnly} role="status">
            {visible.length} projects shown.
          </span>

          <div className={styles.grid}>
            <AnimatePresence initial={false}>
              {visible.map((project) => (
                <motion.button
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={styles.card}
                  exit={{ opacity: 0, scale: 0.94, y: 18 }}
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  key={project.slug}
                  onClick={() => setActive(project)}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  type="button"
                >
                  <span className={styles.imageWrap}>
                    <LazyImage
                      alt={`${project.title} service imagery from the original site`}
                      height={900}
                      src={project.image}
                      width={1200}
                    />
                    <span className={styles.category}>{project.category}</span>
                  </span>
                  <span className={styles.cardTitle}>{project.title}</span>
                  <span className={styles.cardBody}>{project.subtitle}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <Modal className={styles.modal} label={`${active?.title ?? ''} details`} onClose={close} open={Boolean(active)}>
        {active ? (
          <>
            <button className={styles.close} onClick={close} type="button">
              <X size={20} aria-hidden="true" />
              <span className={styles.srOnly}>Close project details</span>
            </button>
            <LazyImage
              alt={`${active.title} service imagery from the original site`}
              className={styles.modalImage}
              eager
              height={675}
              src={active.image}
              width={1200}
            />
            <span className={styles.category}>{active.category}</span>
            <h3>{active.title}</h3>
            <p className={styles.modalSubtitle}>{active.subtitle}</p>
            {active.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className={styles.modalLink} to={active.route}>
              Explore {active.title}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </>
        ) : null}
      </Modal>
    </>
  )
}
