import { content } from '../data/content.js'
import PageHeader from '../components/sections/PageHeader.jsx'
import FooterCta from '../components/sections/FooterCta.jsx'
import TiltCard from '../components/ui/TiltCard.jsx'
import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import LazyImage from '../components/ui/LazyImage.jsx'
import TornDivider from '../components/ui/TornDivider.jsx'
import styles from './About.module.css'

const story = content.about.paragraphs[0]
const storySentences = story.match(/[^.]+\./g) ?? []
const values = [
  { title: 'Creative', body: content.about.highlights[0] },
  { title: 'Contemporary', body: content.about.highlights[1] },
  { title: 'Credible', body: content.about.highlights[2] },
]
const timeline = [
  { label: 'Digital at its core', body: storySentences[0] },
  { label: 'Paradigm shift', body: storySentences.slice(1, 3).join(' ') },
  { label: 'The missing link', body: storySentences.slice(5, 7).join(' ') },
  { label: 'Strategic and creative', body: storySentences[7] },
]
const team = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
]

export default function About() {
  return (
    <>
      <PageHeader
        title={content.about.title}
        subtitle={content.about.subtitle}
        breadcrumbs={['Home', 'About']}
        eyebrow={content.meta.siteName}
      />

      <section className={`${styles.hero} ${styles.sun}`}>
        <Container className={styles.heroInner}>
          <Reveal>
            <h2 className={styles.statement}>{content.about.statement}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <LazyImage alt="About e2e Cyber Solutions" className={styles.heroImage} eager src={content.about.image} />
          </Reveal>
        </Container>
      </section>

      <TornDivider color="var(--paper)" />
      <section className={`${styles.section} ${styles.paper}`}>
        <Container>
          <span className={styles.eyebrow}>{content.meta.siteName}</span>
          <h2 className={styles.title}>Creative, Contemporary and Credible</h2>
          <div className={styles.values}>
            {values.map((value, index) => (
              <TiltCard className={styles.valueWrap} key={value.title}>
                <article className={styles.valueCard}>
                  <span className={styles.valueNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{value.title}</h3>
                  <p>{value.body}</p>
                </article>
              </TiltCard>
            ))}
          </div>
        </Container>
      </section>

      <TornDivider color="var(--tomato)" />
      <section className={`${styles.section} ${styles.tomato}`}>
        <Container>
          <span className={styles.eyebrow}>The story so far</span>
          <h2 className={styles.title}>From idea to impact.</h2>
          <ol className={styles.timeline}>
            {timeline.map((item, index) => (
              <Reveal className={styles.timelineItem} delay={index * 0.07} key={item.label}>
                <span className={styles.timelineNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <TornDivider color="var(--violet)" />
      <section className={`${styles.section} ${styles.violet}`}>
        <Container className={styles.wing}>
          <span className={styles.eyebrow}>Digital wing of the e2e World</span>
          <p className={styles.wingQuote}>{story.split('.')[0]}.</p>
          <p className={styles.wingBody}>{content.about.paragraphs[0]}</p>
        </Container>
      </section>

      <TornDivider color="var(--lilac)" />
      <section className={`${styles.section} ${styles.lilac}`}>
        <Container>
          <span className={styles.eyebrow}>The people behind it</span>
          <h2 className={styles.title}>Meet the team.</h2>
          <div className={styles.team}>
            {team.map((photo, index) => (
              <figure className={styles.member} key={photo}>
                <LazyImage alt={`Dummy Unsplash portrait ${index + 1}`} height={1000} src={photo} width={800} />
                <span className={styles.dummyBadge}>Dummy Unsplash photo</span>
                <figcaption>Team member {String(index + 1).padStart(2, '0')}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <TornDivider color="var(--sun)" />
      <FooterCta />
    </>
  )
}
