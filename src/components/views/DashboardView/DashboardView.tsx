import React, { useLayoutEffect } from 'react';
import { FullscreenImageOverlay } from '../../modals';
import {
  Leaderboard,
  Prompt,
  StreamOrganism,
  TwoColumn,
  VotingOrganism,
} from '../../organisms';
import { DashboardTemplate } from '../../templates';

export interface DashboardViewProps {
  submitVotes?: () => Promise<unknown>;
}

export default function DashboardView({
  submitVotes,
}: DashboardViewProps): React.ReactElement {
  useLayoutEffect((): void => {
    // get cookie named 'user' from browser session
    const user = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('user='));
    if (user) {
      // store in local storage as "logged:in:user"
      localStorage.setItem('logged:in:user', JSON.stringify(user));
    }
    const token = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('token='));
    if (token) {
      // store in local storage as "token"
      localStorage.setItem('token', JSON.stringify(token));
    }
    return;
  }, []);
  return (
    <DashboardTemplate>
      <FullscreenImageOverlay />
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
      <VotingOrganism submitVotes={submitVotes} />
      <StreamOrganism />
    </DashboardTemplate>
  );
}
