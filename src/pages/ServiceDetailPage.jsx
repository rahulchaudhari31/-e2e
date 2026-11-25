import { Navigate, useParams } from 'react-router-dom'
import { content } from '../data/content.js'
import ServiceDetail from '../components/sections/ServiceDetail.jsx'
import NotFound from './NotFound.jsx'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const sourceSlug = `${slug}.php`
  const route = content.routeBySlug[sourceSlug]
  const service = content.servicePages.find(
    (item) => item.slug === sourceSlug && item.slug !== 'service-detail.php',
  )

  if (!service || !route) {
    return <NotFound />
  }

  if (!route.startsWith('/services/')) {
    return <Navigate to={route} replace />
  }

  return <ServiceDetail service={service} />
}
