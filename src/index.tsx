import { Auth0Provider } from '@auth0/auth0-react';
import { ErrorBoundary } from '@story-squad/react-utils';
import { IErrorFallbackProps } from '@story-squad/react-utils/dist/utils/ErrorBoundary/types';
import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

dotenv.config();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
if (!domain || !clientId || !audience) {
  throw new Error(
    'Missing Auth0 environment variables. Please check your .env file. So long, and thanks for all the fish! 🐬',
  );
}

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth0Provider
        domain={domain || ''}
        clientId={clientId || ''}
        redirectUri={`${window.location.origin}`}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        audience={audience} // this is the identifier found in the Auth0 dashboard under Applications > APIs > Clash API
        // these are the scopes listed in the Auth0 dashboard under Applications > APIs > Auth0 Management API > Permissions
        scope="
        read:users
        update:users
        delete:users
        create:users
        read:users_app_metadata
        update:users_app_metadata
        delete:users_app_metadata
        create:users_app_metadata
        "
      >
        <RecoilRoot>
          <Router>
            <ErrorBoundary fallback={ErrorComponent}>
              <App />
            </ErrorBoundary>
          </Router>
        </RecoilRoot>
      </Auth0Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

function ErrorComponent({
  error,
  children,
}: React.PropsWithChildren<IErrorFallbackProps>) {
  return (
    <>
      <p>{error.message}</p>
      {children}
    </>
  );
}
