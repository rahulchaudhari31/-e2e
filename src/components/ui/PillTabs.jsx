import { useEffect, useId, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PillTabs.module.css'

export default function PillTabs({ tabs = [], initialIndex = 0, className = '' }) {
  const [active, setActive] = useState(initialIndex)
  const buttons = useRef([])
  const baseId = useId().replace(/:/g, '')

  useEffect(() => {
    if (!tabs.length) {
      return undefined
    }

    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(frame)
  }, [active, tabs.length])

  if (!tabs.length) {
    return null
  }

  const select = (index) => {
    setActive(index)
    buttons.current[index]?.focus()
  }

  const handleKeyDown = (event, index) => {
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key]

    if (next === undefined) {
      return
    }

    event.preventDefault()
    select(next)
  }

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      <div className={styles.tabs} role="tablist" aria-label="Service categories">
        {tabs.map((tab, index) => (
          <button
            aria-controls={`${baseId}-panel-${index}`}
            aria-selected={index === active}
            className={`${styles.tab} ${index === active ? styles.active : ''}`.trim()}
            id={`${baseId}-tab-${index}`}
            key={tab.label}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              buttons.current[index] = element
            }}
            role="tab"
            tabIndex={index === active ? 0 : -1}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          aria-labelledby={`${baseId}-tab-${index}`}
          className={styles.panel}
          hidden={index !== active}
          id={`${baseId}-panel-${index}`}
          key={tab.label}
          role="tabpanel"
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
