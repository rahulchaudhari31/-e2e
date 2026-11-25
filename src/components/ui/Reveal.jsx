import { motion, useReducedMotion } from 'framer-motion'
import styles from './Reveal.module.css'

export default function Reveal({ children, className = '', delay = 0, y = 32 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`${styles.reveal} ${className}`.trim()}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
