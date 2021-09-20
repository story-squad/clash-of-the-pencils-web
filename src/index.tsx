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
      <RecoilRoot>
        <Router>
          <ErrorBoundary fallback={ErrorComponent}>
            <App />
          </ErrorBoundary>
        </Router>
      </RecoilRoot>
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
