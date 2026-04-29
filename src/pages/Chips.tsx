import SeoHead from '../components/SeoHead';
import ComingSoon from '../components/ui/ComingSoon';

export default function Chips() {
  return (
    <>
      <SeoHead
        title="Poker Chip Distribution Calculator"
        description="Calculate the ideal poker chip distribution for your home game buy-in. Enter your chip set and buy-in amount to get a balanced starting stack by denomination."
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
