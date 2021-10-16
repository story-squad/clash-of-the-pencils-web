import React from 'react';
import StreamWrapper from './StreamWrapper';

export default function StreamFailureFallback(): React.ReactElement {
  return (
    <StreamWrapper>
      <h2>Could not load stream</h2>
      <p>
        We&apos;re sorry, an error occurred while trying to load the stream.
        Please try again later!
      </p>
    </StreamWrapper>
  );
}
