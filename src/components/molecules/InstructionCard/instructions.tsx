import React from 'react';
import { Badges } from '../../../assets';

export function getBadgeForStep(step: number): React.ReactElement {
  switch (step) {
    case 1:
      return <Badges.One />;
    case 2:
      return <Badges.Two />;
    case 3:
      return <Badges.Three />;
    default:
      return <Badges.Check />;
  }
}

export default [
  {
    header: 'Read the Top 3',
    body: 'The power is now in your hands to determine the winner!',
  },
  {
    header: 'Drag-n-Drop',
    body: 'Drag and drop the dragons to vote for your 1st, 2nd, and 3rd favorite stories.',
  },
  {
    header: 'Submit Your Votes',
    body: 'Tune into the Story Squad livestream to find out today’s champion!',
  },
];
