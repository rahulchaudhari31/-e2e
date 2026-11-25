import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import styles from './PageTransition.module.css'

export default function PageTransition({ routeKey, children }) {
  const reduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        className={styles.page}
        id="main-content"
        key={routeKey}
        tabIndex={-1}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
