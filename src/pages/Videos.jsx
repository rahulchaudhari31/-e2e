import { content } from '../data/content.js'
import PageHeader from '../components/sections/PageHeader.jsx'
import VideoGallery from '../components/sections/VideoGallery.jsx'
import FooterCta from '../components/sections/FooterCta.jsx'
import Container from '../components/ui/Container.jsx'
import TornDivider from '../components/ui/TornDivider.jsx'
import styles from './Videos.module.css'

const video = content.servicePages.find((item) => item.slug === 'videos.php')

export default function Videos() {
  return (
    <>
      <PageHeader
        title={video.title}
        subtitle={video.subtitle}
        breadcrumbs={['Home', 'Services', video.title]}
        eyebrow={content.meta.siteName}
      />

      <section className={`${styles.section} ${styles.sun}`}>
        <Container>
          {video.paragraphs.map((paragraph) => (
            <p className={styles.body} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </Container>
      </section>

      <TornDivider color="var(--violet)" />
      <VideoGallery />

      <TornDivider color="var(--sun)" />
      <FooterCta />
    </>
  )
}
