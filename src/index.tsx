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

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
        redirectUri={window.location.origin}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        audience="https://clash-api-auth0" // this is the identifier found in the Auth0 dashboard under Applications > APIs > Clash API
        scope="read:data write:data" // these are the scopes listed in the Auth0 dashboard under Applications > APIs > Clash API
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
