import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './HighlightText.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function HighlightText({ children, color = 'var(--sun)' }) {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(bar, { scaleX: 1 })
      return undefined
    }

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          once: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <span className={styles.highlight} style={{ '--highlight-color': color }}>
      {children}
      <span aria-hidden="true" className={styles.bar} ref={barRef} />
    </span>
  )
}
