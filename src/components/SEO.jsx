import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, type = 'website', image = '/og-image.png', canonicalPath, schemaData }) {
  const location = useLocation();
  const path = canonicalPath || location.pathname;
  const canonicalUrl = `https://vetrivel-28.vercel.app${path}`;
  
  const formattedTitle = title || 'Vetrivel A | Data Scientist & ML Engineer';
  const desc = description || 'Data Science student specializing in Machine Learning, NLP, Data Engineering, Analytics, and scalable data systems.';

  const isArticle = type === 'article';
  const ogType = isArticle ? 'article' : 'website';

  let schema = {};

  const personSchema = {
    "@type": "Person",
    "name": "Vetrivel A",
    "url": "https://vetrivel-28.vercel.app",
    "jobTitle": "Data Scientist & ML Engineer",
    "sameAs": [
      "https://www.linkedin.com/in/vetrivel28",
      "https://github.com/vetrivel-28"
    ]
  };

  if (type === 'website') {
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "url": "https://vetrivel-28.vercel.app",
          "name": "Vetrivel A Portfolio",
          "author": personSchema
        },
        {
          "@context": "https://schema.org",
          ...personSchema
        }
      ]
    };
  } else if (type === 'profile') {
    schema = {
      "@context": "https://schema.org",
      ...personSchema
    };
  } else if (type === 'project' && schemaData) {
    schema = {
      "@context": "https://schema.org",
      "@type": ["CreativeWork", "SoftwareSourceCode"],
      "name": schemaData.title || formattedTitle,
      "description": schemaData.businessObjective || desc,
      "author": personSchema,
      "programmingLanguage": schemaData.tech ? schemaData.tech.join(', ') : undefined,
      "codeRepository": schemaData.links?.repo,
      "url": canonicalUrl
    };
  } else if (type === 'article' && schemaData) {
    schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": schemaData.title || formattedTitle,
      "author": personSchema,
      "datePublished": schemaData.date,
      "description": desc,
      "url": canonicalUrl
    };
  } else {
    // Fallback
    schema = {
      "@context": "https://schema.org",
      ...personSchema
    };
  }

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={`https://vetrivel-28.vercel.app${image}`} />
      <meta property="og:site_name" content="Vetrivel A Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vetrivel-a" />
      <meta name="twitter:creator" content="@vetrivel-a" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`https://vetrivel-28.vercel.app${image}`} />
      
      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
