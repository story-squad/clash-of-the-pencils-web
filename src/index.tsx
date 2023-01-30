import { IErrorFallbackProps } from '@story-squad/react-utils/dist/utils/ErrorBoundary/types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from './utils/ErrorBoundary';
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

root.render(
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
