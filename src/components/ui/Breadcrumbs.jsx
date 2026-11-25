import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumbs.module.css'

export default function Breadcrumbs({ items = [], className = '' }) {
  if (!items.length) {
    return null
  }

  return (
    <nav className={`${styles.breadcrumbs} ${className}`.trim()} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const to = index === 0 ? '/' : index === 1 ? '/services' : undefined
        return (
          <span className={styles.item} key={`${item}-${index}`}>
            {to && !isLast ? (
              <Link to={to}>{item}</Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{item}</span>
            )}
            {!isLast ? <ChevronRight size={13} aria-hidden="true" /> : null}
          </span>
        )
      })}
    </nav>
  )
}
