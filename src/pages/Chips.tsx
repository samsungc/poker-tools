import SeoHead from '../components/SeoHead';
import ComingSoon from '../components/ui/ComingSoon';

export default function Chips() {
  return (
    <>
      <SeoHead
        title="Poker Chip Distribution Calculator"
        description="Work out the best chip distribution per buy-in for your home game. Tells you how many of each denomination per stack."
        path="/chips"
      />
      <ComingSoon
        emoji="🎰"
        title="Chip Distribution"
        blurb="Tell us your chip set and buy-in, get a recommended starting stack — even chips, clean denominations."
        features={[
          'Pick your chip colors and counts',
          'Set buy-in and number of players',
          'Get an even, balanced stack recommendation',
          'Suggestions for color-up later in the night',
        ]}
      />
    </>
  );
}
