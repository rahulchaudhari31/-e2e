import { content } from '../data/content.js'
import PageHeader from '../components/sections/PageHeader.jsx'
import PortfolioGrid from '../components/sections/PortfolioGrid.jsx'
import FooterCta from '../components/sections/FooterCta.jsx'
import TornDivider from '../components/ui/TornDivider.jsx'

export default function Portfolio() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        subtitle={content.home.intro.body[0]}
        eyebrow={content.meta.siteName}
      />

      <TornDivider color="var(--sun)" />
      <PortfolioGrid />

      <TornDivider color="var(--tomato)" />
      <FooterCta />
    </>
  )
}
