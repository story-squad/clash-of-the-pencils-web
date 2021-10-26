import { ErrorBoundary } from '@story-squad/react-utils';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilValue } from 'recoil';
import { TUTORIAL_IDS } from '../../../config';
import { app } from '../../../state';
import StreamFailureFallback from './StreamFailureFallback';
import StreamWrapper from './StreamWrapper';

const streamURL = process.env.REACT_APP_LIVESTREAM_URL;

function Stream(): React.ReactElement {
  const [playing, setPlaying] = useState(false);
  const [renderFallback, setRenderFallback] = useState(streamURL === undefined);
  const currentMessage = useRecoilValue(app.tutorial.currentMessageIndex);

  const hidePlayer = () => {
    setRenderFallback(true);
  };
  const onReady = () => {
    setPlaying(true);
  };

  // if (renderFallback) return <OfflineStreamVideo />;
  // else {
  return (
    <StreamWrapper
      id={TUTORIAL_IDS.ID_STREAM}
      className={currentMessage === 6 ? 'active-tutorial' : ''}
    >
      {playing && (
        <h2>{renderFallback ? 'Latest Stream' : 'Streaming Now!'}</h2>
      )}
      <ReactPlayer
        muted
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
