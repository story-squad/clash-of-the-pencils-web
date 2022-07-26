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
import axios, { Method } from 'axios';

interface Options {
  method: Method | undefined;
  url: string;
  headers: Record<string, string>;
  data: URLSearchParams;
}

export interface DashboardViewProps {
  submitVotes?: () => Promise<unknown>;
}

export default function DashboardView({
  submitVotes,
}: DashboardViewProps): React.ReactElement {
  const { user, isLoading, isAuthenticated } = useAuth0();
  useEffect(() => {
    const options: Options = {
      method: 'POST',
      url: 'https://dev-dwwemlm7.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID || '',
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET || '',
        code: process.env.REACT_APP_AUTH0_CODE || 'what code?',
        redirect_uri:
          process.env.REACT_APP_AUTH0_REDIRECT_URI || 'http://localhost:3000/',
      }),
    };
    // get tokens from Auth0
    if (isAuthenticated) {
      axios
        .request(options)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
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
