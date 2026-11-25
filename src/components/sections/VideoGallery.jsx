import { useCallback, useState } from 'react'
import { Play, X } from 'lucide-react'
import { content } from '../../data/content.js'
import Container from '../ui/Container.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import Modal from '../ui/Modal.jsx'
import styles from './VideoGallery.module.css'

const videoSrc = content.home.hero.video.replaceAll('&;', '&')
const slugs = ['videos.php', 'creative.php', 'branding.php', 'content-writing.php']
const cards = slugs
  .map((slug) => content.servicePages.find((service) => service.slug === slug))
  .filter(Boolean)

export default function VideoGallery() {
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <section className={styles.section}>
        <Container>
          <span className={styles.eyebrow}>{content.meta.siteName}</span>
          <h2 className={styles.title}>Stories worth watching.</h2>
          <div className={styles.grid}>
            {cards.map((card) => (
              <button
                className={styles.card}
                key={card.slug}
                onClick={() => setActive(card)}
                type="button"
              >
                <span className={styles.imageWrap}>
                  <LazyImage
                    alt={`${card.title} video thumbnail from the original site`}
                    height={750}
                    src={card.image}
                    width={1200}
                  />
                  <span className={styles.play} aria-hidden="true">
                    <Play size={26} fill="currentColor" />
                  </span>
                </span>
                <span className={styles.cardTitle}>{card.title}</span>
                <span className={styles.cardBody}>{card.subtitle}</span>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Modal className={styles.modal} label={`${active?.title ?? ''} video player`} onClose={close} open={Boolean(active)}>
        {active ? (
          <>
            <button className={styles.close} onClick={close} type="button">
              <X size={20} aria-hidden="true" />
              <span className={styles.srOnly}>Close video</span>
            </button>
            <div className={styles.player}>
              <iframe
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                src={videoSrc}
                title={`${active.title} video`}
              />
            </div>
            <h3>{active.title}</h3>
            <p>{active.subtitle}</p>
          </>
        ) : null}
      </Modal>
    </>
  )
}
