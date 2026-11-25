import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './Button.module.css'

export default function Button({
  children,
  className = '',
  href,
  icon: Icon = ArrowUpRight,
  magnetic = true,
  to,
  type = 'button',
  variant = 'solid',
  ...props
}) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const classes = `${styles.button} ${styles[variant] || styles.solid} ${className}`.trim()

  useEffect(() => {
    const element = ref.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

    if (!element || !magnetic || reduceMotion || !finePointer.matches) {
      return undefined
    }

    const onMove = (event) => {
      const rect = element.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      element.style.transform = `translate3d(${x * 0.16}px, ${y * 0.16}px, 0)`
    }

    const onLeave = () => {
      element.style.transform = 'translate3d(0, 0, 0)'
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)

    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      element.style.transform = ''
    }
  }, [magnetic, reduceMotion])

  const content = (
    <>
      <span>{children}</span>
      {href ? <span className={styles.srOnly}> (opens in a new tab)</span> : null}
      {Icon ? <Icon size={17} strokeWidth={2.2} aria-hidden="true" /> : null}
    </>
  )

  if (to) {
    return (
      <Link className={classes} ref={ref} to={to} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} ref={ref} rel="noreferrer" target="_blank" {...props}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} ref={ref} type={type} {...props}>
      {content}
    </button>
  )
}
