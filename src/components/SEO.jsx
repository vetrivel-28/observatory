import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, image = '/og-image.png' }) {
  const location = useLocation();
  const canonicalUrl = `https://vetrivel-a.dev${location.pathname}`;

  useEffect(() => {
    // Update Title
    const formattedTitle = title ? `${title} | Vetrivel A` : 'Vetrivel A | Data Scientist & ML Engineer';
    document.title = formattedTitle;

    // Helper to update meta tags
    const setMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Meta Descriptions
    const desc = description || 'Building machine learning systems, analytics workflows, and scalable data pipelines to transform raw information into business intelligence.';
    setMeta('description', desc);

    // Update Open Graph tags
    setMeta('og:title', formattedTitle, true);
    setMeta('og:description', desc, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', image, true);

    // Update Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', formattedTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', image);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

  }, [title, description, image, canonicalUrl]);

  return null;
}
