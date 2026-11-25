import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './ServiceAccordion.module.css'

export default function ServiceAccordion({ items = [], initialOpen = 0 }) {
  const [open, setOpen] = useState(initialOpen)
  const reduceMotion = useReducedMotion()

  const moveFocus = (event, index) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return
    }

    event.preventDefault()
    const buttons = Array.from(
      event.currentTarget.closest(`.${styles.accordion}`)?.querySelectorAll('button') ?? [],
    )
    const last = buttons.length - 1
    const target =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? last
          : event.key === 'ArrowDown'
            ? (index + 1) % buttons.length
            : (index - 1 + buttons.length) % buttons.length

    buttons[target]?.focus()
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = open === index
        const panelId = `service-panel-${item.slug.replace(/\W/g, '-')}`
        const buttonId = `service-button-${item.slug.replace(/\W/g, '-')}`

        return (
          <article className={styles.item} key={item.slug}>
            <h3 className={styles.heading}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={styles.trigger}
                id={buttonId}
                onClick={() => setOpen(isOpen ? -1 : index)}
                onKeyDown={(event) => moveFocus(event, index)}
                type="button"
              >
                <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.title}>{item.title}</span>
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`.trim()} aria-hidden="true">
                  +
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  aria-labelledby={buttonId}
                  className={styles.panel}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  id={panelId}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  role="region"
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.subtitle}>{item.subtitle}</p>
                    {item.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <Link className={styles.link} to={item.route}>
                      View {item.title}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        )
      })}
    </div>
  )
}
