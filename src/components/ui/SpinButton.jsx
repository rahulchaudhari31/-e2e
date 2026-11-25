import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { content } from '../../data/content.js'
import styles from './SpinButton.module.css'

const label = content.home.hero.cta
const ringText = `${label.toUpperCase()} • ${label.toUpperCase()} • ${label.toUpperCase()} • `

export default function SpinButton() {
  return (
    <Link className={styles.button} to="/contact" aria-label={label}>
      <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="e2e-start-ring" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <text>
          <textPath href="#e2e-start-ring" startOffset="0">
            {ringText}
          </textPath>
        </text>
      </svg>
      <span className={styles.center}>
        <ArrowUpRight size={26} strokeWidth={2.4} aria-hidden="true" />
      </span>
    </Link>
  )
}
