import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import styles from './TiltCard.module.css'

export default function TiltCard({ children, className = '' }) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 22,
  })

  const handleMove = (event) => {
    if (reduceMotion) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const reset = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <motion.div
      className={`${styles.card} ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  )
}
