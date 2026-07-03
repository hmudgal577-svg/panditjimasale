import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
}) => {
  const siteName = 'Pandit Ji Masale';
  const defaultDescription = 'Pandit Ji Masale, Gwalior MP — Shudhta Aapke Ghar Tak. Buy premium Khade Masale (Whole Spices), Dry Fruits & Pooja Samagri online. 100% pure, farm-fresh. Free delivery above ₹499. WhatsApp: 7415992703.';
  const defaultKeywords = 'khade masale online gwalior, masale gwalior MP, whole spices india, dry fruits online gwalior, pooja samagri gwalior, pandit ji masale, pure masale madhya pradesh, organic spices india, kali mirch jeera elaichi online, masale online order gwalior';
  const defaultImage = 'https://panditjimasale.com/og-image.jpg';
  const siteUrl = 'https://panditjimasale.com';

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Premium Masale, Dry Fruits & Pooja Samagri Online`;
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph (Facebook, WhatsApp) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
