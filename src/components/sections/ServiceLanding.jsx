import { content } from '../../data/content.js'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Breadcrumbs from '../ui/Breadcrumbs.jsx'
import FooterCta from './FooterCta.jsx'
import TiltCard from '../ui/TiltCard.jsx'
import TornDivider from '../ui/TornDivider.jsx'
import PlugMascot from '../mascots/PlugMascot.jsx'
import styles from './ServiceLanding.module.css'

const featureSlugs = {
  'web-design.php': ['web-design.php', 'design-and-development.php', 'development.php'],
  'mobile-app-desig-and-development.php': [
    'mobile-app-desig-and-development.php',
    'ecommerce-websites.php',
    'cms.php',
  ],
  'digital-marketing.php': ['digital-marketing.php', 'digital-strategy.php', 'seo.php', 'ppc-management.php'],
}

const testimonial = content.testimonials.find((item) => item.name === 'Josephine B. Anderson')

export default function ServiceLanding({ slug, accessory, accent }) {
  const service = content.servicePages.find((item) => item.slug === slug)
  const features = (featureSlugs[slug] ?? [])
    .map((featureSlug) => content.servicePages.find((item) => item.slug === featureSlug))
    .filter(Boolean)

  return (
    <>
      <section className={styles.hero} style={{ '--accent': accent }}>
        <Container className={styles.heroInner}>
          <div className={styles.copy}>
            <Breadcrumbs className={styles.breadcrumbs} items={['Home', 'Services', service.title]} />
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.subtitle}>{service.subtitle}</p>
            <p className={styles.body}>{service.paragraphs[0]}</p>
            <div className={styles.actions}>
              <Button to="/contact">Get Started</Button>
              <Button to="/services" variant="outline">
                All services
              </Button>
            </div>
          </div>
          <div className={styles.mascot}>
            <PlugMascot accessory={accessory} />
          </div>
        </Container>
      </section>

      <TornDivider color="var(--paper)" />
      <section className={`${styles.section} ${styles.paper}`}>
        <Container>
          <span className={styles.eyebrow}>What we do</span>
          <h2 className={styles.title}>Built for your next move.</h2>
          <div className={styles.cards}>
            {features.map((feature, index) => (
              <TiltCard className={styles.cardWrap} key={feature.slug}>
                <article className={styles.card}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.subtitle}</p>
                </article>
              </TiltCard>
            ))}
          </div>
        </Container>
      </section>

      <TornDivider color="var(--mint)" />
      <section className={`${styles.section} ${styles.mint}`}>
        <Container>
          <span className={styles.eyebrow}>How we work</span>
          <h2 className={styles.title}>A clear path, start to finish.</h2>
          <ol className={styles.process}>
            {content.home.process.map((step) => (
              <li className={styles.processStep} key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <TornDivider color="var(--sun)" />
      <section className={`${styles.section} ${styles.sun}`}>
        <Container className={styles.testimonial}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <blockquote>{testimonial.quote}</blockquote>
          <p>— {testimonial.name}</p>
        </Container>
      </section>

      <TornDivider color="var(--lilac)" />
      <FooterCta />
    </>
  )
}
