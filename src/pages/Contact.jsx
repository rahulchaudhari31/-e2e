import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Mail, MapPin, Phone } from 'lucide-react'
import { content } from '../data/content.js'
import PageHeader from '../components/sections/PageHeader.jsx'
import ContactStrip from '../components/sections/ContactStrip.jsx'
import Container from '../components/ui/Container.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import styles from './Contact.module.css'

const [nameLabel, emailLabel, subjectLabel, messageLabel, sendLabel] = content.contact.formLabels
const emptyValues = { name: '', email: '', subject: '', message: '' }
const requiredFields = ['name', 'email', 'subject']

function validate(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Please enter a subject.'
  }

  return errors
}

export default function Contact() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const fields = useRef({})
  const reduceMotion = useReducedMotion()

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstError = requiredFields.find((field) => nextErrors[field])
    if (firstError) {
      fields.current[firstError]?.focus()
      return
    }

    const body = [
      `${nameLabel}: ${values.name.trim()}`,
      `${emailLabel}: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n')

    setSent(true)
    window.location.href = `mailto:${content.contact.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle={content.contact.contactPageSubtitle}
        eyebrow={content.meta.siteName}
      />

      <section className={styles.section}>
        <Container className={styles.grid}>
          <Reveal className={styles.details}>
            <div className={styles.detail}>
              <Phone size={22} aria-hidden="true" />
              <div>
                <h2>Call Us</h2>
                <a href={`tel:${content.contact.phone.replace(/\s/g, '')}`}>{content.contact.phoneNewAccounts}</a>
              </div>
            </div>
            <div className={styles.detail}>
              <Mail size={22} aria-hidden="true" />
              <div>
                <h2>Write Us</h2>
                <a href={`mailto:${content.contact.email}`}>{content.contact.email}</a>
              </div>
            </div>
            <div className={styles.detail}>
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h2>Visit Us</h2>
                <p>{content.contact.addressLines.join(', ')}</p>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.formWrap} delay={0.12}>
            <form className={styles.form} noValidate onSubmit={handleSubmit}>
              <div className={styles.field}>
                <input
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  aria-invalid={Boolean(errors.name)}
                  aria-required="true"
                  autoComplete="name"
                  id="contact-name"
                  name="name"
                  onChange={updateField}
                  placeholder=" "
                  ref={(element) => {
                    fields.current.name = element
                  }}
                  required
                  type="text"
                  value={values.name}
                />
                <label htmlFor="contact-name">{nameLabel}</label>
                {errors.name ? (
                  <small className={styles.error} id="contact-name-error" role="alert">
                    {errors.name}
                  </small>
                ) : null}
              </div>

              <div className={styles.field}>
                <input
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  aria-invalid={Boolean(errors.email)}
                  aria-required="true"
                  autoComplete="email"
                  id="contact-email"
                  name="email"
                  onChange={updateField}
                  placeholder=" "
                  ref={(element) => {
                    fields.current.email = element
                  }}
                  required
                  type="email"
                  value={values.email}
                />
                <label htmlFor="contact-email">{emailLabel}</label>
                {errors.email ? (
                  <small className={styles.error} id="contact-email-error" role="alert">
                    {errors.email}
                  </small>
                ) : null}
              </div>

              <div className={styles.field}>
                <input
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  aria-invalid={Boolean(errors.subject)}
                  aria-required="true"
                  id="contact-subject"
                  name="subject"
                  onChange={updateField}
                  placeholder=" "
                  ref={(element) => {
                    fields.current.subject = element
                  }}
                  required
                  type="text"
                  value={values.subject}
                />
                <label htmlFor="contact-subject">{subjectLabel}</label>
                {errors.subject ? (
                  <small className={styles.error} id="contact-subject-error" role="alert">
                    {errors.subject}
                  </small>
                ) : null}
              </div>

              <div className={`${styles.field} ${styles.messageField}`}>
                <textarea
                  id="contact-message"
                  name="message"
                  onChange={updateField}
                  placeholder=" "
                  rows="6"
                  value={values.message}
                />
                <label htmlFor="contact-message">{messageLabel}</label>
              </div>

              <Button type="submit" variant="solid">
                {sendLabel}
              </Button>

              <AnimatePresence>
                {sent ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={styles.success}
                    exit={{ opacity: 0, y: -8 }}
                    initial={{ opacity: 0, y: 12, scale: reduceMotion ? 1 : 0.94 }}
                    role="status"
                    transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className={styles.check} aria-hidden="true">
                      <Check size={18} />
                    </span>
                    <p>Message ready — your email app should open with it pre-filled.</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </form>
          </Reveal>
        </Container>
      </section>

      <ContactStrip />
    </>
  )
}
