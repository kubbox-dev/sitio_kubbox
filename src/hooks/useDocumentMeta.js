import { useEffect } from 'react'

const SITE_NAME = 'Kubbox'
const DOMAIN = 'https://kubbox.com'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setRouteStructuredData(structuredData) {
  document.head.querySelectorAll('script[data-route-schema="true"]').forEach((el) => el.remove())
  if (!structuredData) return
  const items = Array.isArray(structuredData) ? structuredData : [structuredData]
  items.forEach((item) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-route-schema', 'true')
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...item })
    document.head.appendChild(script)
  })
}

/**
 * Sets document.title, meta description, canonical, Open Graph tags and
 * optional route-specific JSON-LD for the current page.
 * Usage: useDocumentMeta({ title: 'Contacto', description: '...', path: '/contacto' })
 */
export function useDocumentMeta({ title, description, path, structuredData, noindex = false }) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertCanonical(`${DOMAIN}${path}`)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', `${DOMAIN}${path}`)

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
    } else {
      const existing = document.head.querySelector('meta[name="robots"]')
      if (existing) existing.remove()
    }

    setRouteStructuredData(structuredData)

    return () => setRouteStructuredData(null)
  }, [title, description, path, structuredData, noindex])
}
