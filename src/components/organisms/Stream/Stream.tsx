import { ErrorBoundary } from '@story-squad/react-utils';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { default as OfflineStreamVideo } from './OfflineStreamVideo';
import StreamFailureFallback from './StreamFailureFallback';
import StreamWrapper from './StreamWrapper';

const streamURL = process.env.REACT_APP_LIVESTREAM_URL;

function Stream(): React.ReactElement {
  const [playing, setPlaying] = useState(false);
  const [renderFallback, setRenderFallback] = useState(streamURL === undefined);
  const hidePlayer = () => {
    setRenderFallback(true);
  };
  const onReady = () => {
    setPlaying(true);
  };

  if (renderFallback) return <OfflineStreamVideo />;
  else {
    return (
      <StreamWrapper>
        {playing && <h2>Streaming Now!</h2>}
        <ReactPlayer
          url={streamURL}
          playing={playing}
          onReady={onReady}
          onError={hidePlayer}
          controls
          volume={0.4}
          stopOnUnmount
          config={{ youtube: { onUnstarted: hidePlayer } }}
        />
      </StreamWrapper>
    );
  }
}

export default function StreamErrorBound(): React.ReactElement {
  return (
    <ErrorBoundary fallback={StreamFailureFallback}>
      <Stream />
    </ErrorBoundary>
  );
}
