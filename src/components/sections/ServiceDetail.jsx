import { content } from '../../data/content.js'
import PageHeader from './PageHeader.jsx'
import IntroSection from './IntroSection.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Container from '../ui/Container.jsx'
import Reveal from '../ui/Reveal.jsx'
import Testimonials from './Testimonials.jsx'
import CtaSection from './CtaSection.jsx'
import ContactStrip from './ContactStrip.jsx'
import styles from './ServiceDetail.module.css'

export default function ServiceDetail({ service }) {
  const breadcrumbs = ['Home', 'Services', service.title]
  const detailsTitle = service.subheadings[0] || service.title
  const secondaryDetails = service.subheadings.slice(1)

  return (
    <>
      <PageHeader
        title={service.title}
        subtitle={service.subtitle}
        breadcrumbs={breadcrumbs}
        eyebrow={content.meta.siteName}
      />

      <IntroSection
        heading={service.subtitle}
        body={service.paragraphs}
        image={service.image}
        reverse
      />

      {service.listItems.length ? (
        <section className={styles.details}>
          <Container>
            <SectionHeading eyebrow={detailsTitle} title={detailsTitle} />
            <ul className={styles.list}>
              {service.listItems.map((item, index) => (
                <Reveal className={styles.listItem} key={`${item}-${index}`} delay={(index % 3) * 0.06}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </Reveal>
              ))}
            </ul>
            {secondaryDetails.length ? (
              <div className={styles.secondary}>
                {secondaryDetails.map((item, index) => (
                  <p key={`${item}-${index}`}>{item}</p>
                ))}
              </div>
            ) : null}
          </Container>
        </section>
      ) : null}

      <Testimonials items={service.testimonials} eyebrow={content.meta.siteName} />

      <CtaSection
        heading={content.home.cta.heading}
        body={content.home.cta.body}
        buttons={content.home.cta.buttons}
      />

      <ContactStrip />
    </>
  )
}
