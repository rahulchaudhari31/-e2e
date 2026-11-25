import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

const interactiveSelector = 'a, button, input, select, textarea, [role="button"], [role="tab"]'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const rootRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!finePointer.matches || reducedMotion.matches) {
      return undefined
    }

    document.body.classList.add('has-custom-cursor')

    const move = (event) => {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      dotRef.current.style.transform = transform
      ringRef.current.style.transform = transform
      rootRef.current.dataset.visible = 'true'
    }

    const over = (event) => {
      rootRef.current.dataset.active = event.target.closest?.(interactiveSelector) ? 'true' : 'false'
    }

    const leave = () => {
      rootRef.current.dataset.visible = 'false'
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div aria-hidden="true" className={styles.cursor} data-visible="false" ref={rootRef}>
      <span className={styles.ring} ref={ringRef}>
        <span className={styles.ringInner} />
      </span>
      <span className={styles.dot} ref={dotRef} />
    </div>
  )
}
