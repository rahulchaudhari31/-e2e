import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { content } from '../../data/content.js'
import { getSeo, siteName, siteUrl } from '../../data/seo.js'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  telephone: content.contact.phone,
  email: content.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: content.contact.addressLines[0],
    addressLocality: content.contact.addressLines[1],
  },
}

export default function Seo({ description, image, title, type = 'website' }) {
  const location = useLocation()
  const page = getSeo(location.pathname)
  const resolvedTitle = title || page.title
  const resolvedDescription = description || page.description
  const resolvedImage = image || page.image
  const url = `${siteUrl}${location.pathname}`
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: resolvedTitle,
    description: resolvedDescription,
    url,
    isPartOf: { '@type': 'WebSite', name: siteName, url: siteUrl },
  }

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{resolvedTitle}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={resolvedDescription} />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={resolvedImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <script type="application/ld+json">{JSON.stringify(organization)}</script>
      <script type="application/ld+json">{JSON.stringify(webPage)}</script>
    </Helmet>
  )
}
