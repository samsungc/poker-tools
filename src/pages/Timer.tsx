import SeoHead from '../components/SeoHead';
import ComingSoon from '../components/ui/ComingSoon';

export default function Timer() {
  return (
    <>
      <SeoHead
        title="Poker Blinds Timer — Free Tournament Clock"
        description="A simple, mobile-friendly blinds timer for home poker tournaments. Configurable rounds, sound alerts, runs in your browser."
        path="/timer"
      />
      <ComingSoon
        emoji="⏱"
        title="Blinds Timer"
        blurb="A clean tournament clock for your home game — set rounds, hit start, hear when blinds change."
        features={[
          'Configurable round length and blind structure',
          'Sound alerts at level changes',
          'Runs in a background tab without losing time',
          'Phone-friendly so you can leave it on the table',
        ]}
      />
    </>
  );
}
