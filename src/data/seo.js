import { content } from './content.js'

export const siteUrl = content.meta.source.replace(/\/$/, '')
export const siteName = content.meta.siteName

const staticSeo = {
  '/': {
    title: `${siteName} | Web Design, Marketing & Creative Agency`,
    description: content.home.intro.heading,
    image: content.about.image,
  },
  '/about': {
    title: `About Us | ${siteName}`,
    description: content.about.statement,
    image: content.about.image,
  },
  '/services': {
    title: `Services | ${siteName}`,
    description: content.home.intro.body[0],
    image: content.about.image,
  },
  '/videos': {
    title: `Videos | ${siteName}`,
    description: content.servicePages.find((item) => item.slug === 'videos.php')?.subtitle ?? content.home.intro.heading,
    image: content.servicePages.find((item) => item.slug === 'videos.php')?.image ?? content.about.image,
  },
  '/portfolio': {
    title: `Portfolio | ${siteName}`,
    description: content.home.intro.body[0],
    image: content.about.image,
  },
  '/contact': {
    title: `Contact | ${siteName}`,
    description: content.contact.contactPageSubtitle,
    image: content.about.image,
  },
  '/not-found': {
    title: `Page Not Found | ${siteName}`,
    description: `${content.notFound.title} — ${content.notFound.subtitle}`,
    image: content.about.image,
  },
}

export function getSeo(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  const service = content.servicePages.find(
    (item) => item.route === path && item.slug !== 'service-detail.php',
  )

  if (service) {
    return {
      title: `${service.title} | ${siteName}`,
      description: service.subtitle || service.paragraphs?.[0] || content.home.intro.heading,
      image: service.image || content.about.image,
    }
  }

  return staticSeo[path] ?? staticSeo['/not-found']
}
