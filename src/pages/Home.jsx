import { content } from '../data/content.js'
import Hero from '../components/sections/Hero.jsx'
import MissingLink from '../components/sections/MissingLink.jsx'
import Packages from '../components/sections/Packages.jsx'
import PinnedProcess from '../components/sections/PinnedProcess.jsx'
import WorkGallery from '../components/sections/WorkGallery.jsx'
import FooterCta from '../components/sections/FooterCta.jsx'
import Marquee from '../components/ui/Marquee.jsx'
import TornDivider from '../components/ui/TornDivider.jsx'

const placeholderTitles = new Set(['DESIGN & DEVELOPMENT', 'CREATIVE', 'Single Service 3', 'Services 2'])
const marqueeItems = content.servicePages
  .filter((service) => !placeholderTitles.has(service.title))
  .map((service) => service.title)

export default function Home() {
  return (
    <>
      <Hero />

      <TornDivider color="var(--ink)" />
      <Marquee items={marqueeItems} speed={28} color="var(--tomato)" textColor="var(--paper)" />

      <TornDivider color="var(--sun)" />
      <MissingLink />

      <TornDivider color="var(--paper)" />
      <Packages />

      <TornDivider color="var(--ink)" />
      <PinnedProcess />

      <TornDivider color="var(--lilac)" />
      <WorkGallery />

      <TornDivider color="var(--sun)" />
      <FooterCta />

      <TornDivider color="var(--color-bg-alt)" />
    </>
  )
}
