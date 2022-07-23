import React, { useEffect } from 'react';
import { FullscreenImageOverlay } from '../../modals';
import {
  Leaderboard,
  Prompt,
  StreamOrganism,
  TwoColumn,
  VotingOrganism,
} from '../../organisms';
import { DashboardTemplate } from '../../templates';
import { useAuth0 } from '@auth0/auth0-react';

export interface DashboardViewProps {
  submitVotes?: () => Promise<unknown>;
}

export default function DashboardView({
  submitVotes,
}: DashboardViewProps): React.ReactElement {
  const { user, isLoading, isAuthenticated } = useAuth0();
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
  }, [isLoading]);
  useEffect(() => {
    // no need to store the user in localStorage since user data is accessible via the Auth0 Provider
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isAuthenticated, user]);
  return isLoading ? (
    <div>Loading..</div>
  ) : (
    <DashboardTemplate>
      <FullscreenImageOverlay />
      <TwoColumn left={<Prompt />} right={<Leaderboard />} />
      <VotingOrganism submitVotes={submitVotes} />
      <StreamOrganism />
    </DashboardTemplate>
  );
}
