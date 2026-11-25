import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export default function Modal({ children, className = '', label, onClose, open }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousFocus = document.activeElement
    const appRoot = document.getElementById('root')
    const getFocusable = () =>
      Array.from(dialogRef.current?.querySelectorAll(focusableSelector) ?? []).filter(
        (element) => element.getAttribute('aria-hidden') !== 'true',
      )

    appRoot?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'
    ;(getFocusable()[0] ?? dialogRef.current)?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusable = getFocusable()

      if (focusable.length === 0) {
        event.preventDefault()
        dialogRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      appRoot?.removeAttribute('inert')
      document.body.style.overflow = ''
      previousFocus?.focus?.()
    }
  }, [onClose, open])

  if (!open) {
    return null
  }

  return createPortal(
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        aria-label={label}
        aria-modal="true"
        className={`${styles.dialog} ${className}`.trim()}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
