import { SITE } from '../lib/site';

type Props = {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown>;
};

export default function SeoHead({ title, description, path, jsonLd }: Props) {
  const canonical = `${SITE.url}${path === '/' ? '' : path}`;
  const ogImageUrl = `${SITE.url}${SITE.ogImage}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} · ${SITE.name}`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </>
  );
}
