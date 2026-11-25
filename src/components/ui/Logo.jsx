import { Link } from 'react-router-dom'
import { content } from '../../data/content.js'
import LazyImage from './LazyImage.jsx'
import styles from './Logo.module.css'

export default function Logo({ className = '' }) {
  return (
    <Link className={`${styles.logo} ${className}`.trim()} to="/" aria-label={`${content.meta.siteName} home`}>
      <LazyImage alt={`${content.meta.siteName} logo`} eager height={60} src={content.media.logo} width={180} />
    </Link>
  )
}
