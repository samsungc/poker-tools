import SeoHead from '../components/SeoHead';
import ComingSoon from '../components/ui/ComingSoon';

export default function BombPot() {
  return (
    <>
      <SeoHead
        title="Bomb Pot Helper for Home Poker"
        description="Bomb pot rules cheat-sheet and randomizer for home games. Pick a frequency, decide between PLO and NLHE, never argue at the table again."
        path="/bomb-pot"
      />
      <ComingSoon
        emoji="💣"
        title="Bomb Pot Helper"
        blurb="Set the rules once, let the app tell you when the next bomb pot fires — and which variant to deal."
        features={[
          'Pick frequency: every N hands, every dealer button, on the half-hour',
          'Mix variants: NLHE, PLO, double-board PLO, straddle stacks',
          'Audible alert at the table',
          'Quick rule sheet to settle disputes',
        ]}
      />
    </>
  );
}
