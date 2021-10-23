import { ErrorBoundary } from '@story-squad/react-utils';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import StreamFailureFallback from './StreamFailureFallback';
import StreamWrapper from './StreamWrapper';

const streamURL = process.env.REACT_APP_LIVESTREAM_URL;

function Stream(): React.ReactElement {
  const [playing /* setPlaying */] = useState(false);
  const [renderFallback, setRenderFallback] = useState(streamURL === undefined);
  const hidePlayer = () => {
    setRenderFallback(true);
  };
  const onReady = () => {
    // setPlaying(true);
  };

  // if (renderFallback) return <OfflineStreamVideo />;
  // else {
  return (
    <StreamWrapper>
      {playing && (
        <h2>{renderFallback ? 'Latest Stream' : 'Streaming Now!'}</h2>
      )}
      <ReactPlayer
        url={streamURL}
        playing={playing}
        onReady={onReady}
        onError={hidePlayer}
        controls
        stopOnUnmount
        config={{ youtube: { onUnstarted: hidePlayer } }}
      />
    </StreamWrapper>
  );
  // }
}

export default function StreamErrorBound(): React.ReactElement {
  return (
    <ErrorBoundary fallback={StreamFailureFallback}>
      <Stream />
    </ErrorBoundary>
  );
}
