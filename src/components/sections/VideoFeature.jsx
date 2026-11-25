import { Play } from 'lucide-react'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import Reveal from '../ui/Reveal.jsx'
import styles from './VideoFeature.module.css'

export default function VideoFeature({ src, image, label }) {
  const videoSrc = src.replaceAll('&;', '&')

  return (
    <section className={styles.section}>
      <Container>
        <Reveal className={styles.frame}>
          <iframe
            src={videoSrc}
            title={label}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
          />
          <div className={styles.corner} aria-hidden="true">
            <Play size={18} fill="currentColor" aria-hidden="true" />
            {label}
          </div>
        </Reveal>

        {image ? (
          <Reveal className={styles.thumbnail} delay={0.12}>
            <LazyImage alt={`${label} video thumbnail from the original site`} src={image} />
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
