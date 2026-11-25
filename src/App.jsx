import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const WebDesign = lazy(() => import('./pages/WebDesign.jsx'))
const MobileApps = lazy(() => import('./pages/MobileApps.jsx'))
const DigitalMarketing = lazy(() => import('./pages/DigitalMarketing.jsx'))
const Videos = lazy(() => import('./pages/Videos.jsx'))
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="web-design" element={<WebDesign />} />
        <Route path="mobile-apps" element={<MobileApps />} />
        <Route path="digital-marketing" element={<DigitalMarketing />} />
        <Route path="videos" element={<Videos />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
