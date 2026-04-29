import SeoHead from '../components/SeoHead';
import SessionTracker from '../components/SessionTracker';
import { SITE } from '../lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.defaultDescription,
    },
    {
      '@type': 'WebApplication',
      name: SITE.name,
      url: SITE.url,
      description: SITE.defaultDescription,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function Session() {
  return (
    <>
      <SeoHead
        title="Free Poker Session Tracker — No Sign-up"
        description="Track buy-ins, rebuys, and cashouts for every player in your home poker game. Free, no sign-up — runs entirely in your browser, no app needed."
        path="/"
        jsonLd={jsonLd}
      />
      <SessionTracker />
    </>
  );
}
