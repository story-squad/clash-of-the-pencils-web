import { parse } from 'query-string';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DashboardTemplate } from '../../templates';

function ErrorView(): React.ReactElement {
  const { search } = useLocation();

  useEffect(() => {
    const parsedParams = parse(search);
    const e = parsedParams.message;
    throw new Error(e && typeof e === 'string' ? e : 'An error occurred.');
  }, []);

  return <></>;
}

/**
 * This should hopefully work in a way that we can throw the error,
 * which will cause the DashboardTemplate to render the fallback in
 * its scoped ErrorBound component.
 */
export default function ErrorViewCatcher(): React.ReactElement {
  return (
    <DashboardTemplate>
      <ErrorView />
    </DashboardTemplate>
  );
}
