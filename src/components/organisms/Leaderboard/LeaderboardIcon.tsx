import React, { useMemo } from 'react';
import { lbIcons } from '../../../assets';
import { Picture } from '../../atoms';

export interface LeaderboardIconProps {
  icon: keyof typeof lbIcons;
}

export default function LeaderboardIcon({
  icon,
}: LeaderboardIconProps): React.ReactElement {
  const alt = useMemo(() => {
    switch (icon) {
      case 'place':
        return "This user's placement based on score for this week";
      case 'submitted':
        return 'Number of times this user submitted this week';
      case 'voted':
        return 'Number of times this user voted this week';
    }
  }, [icon]);
  return (
    <Picture
      containerProps={{ className: 'leaderboard-icon' }}
      description={alt}
      source={lbIcons[icon]}
      disablePreview
    />
  );
}
