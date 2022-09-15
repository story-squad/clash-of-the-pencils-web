import { classnames, ErrorBoundary } from '@story-squad/react-utils';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilValue } from 'recoil';
import { TUTORIAL_IDS } from '../../../config';
import { tutorial } from '../../../state';
// import StreamFailureFallback from './StreamFailureFallback';
import StreamWrapper from './StreamWrapper';

const streamURL = process.env.REACT_APP_LIVESTREAM_URL;

const Stream = (): React.ReactElement => {
  const [playing, setPlaying] = useState(false);
  const [renderFallback, setRenderFallback] = useState(streamURL === undefined);
  const message = useRecoilValue(tutorial.currentMessage);

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
      className={classnames(
        message.id === TUTORIAL_IDS.ID_STREAM && 'active-tutorial',
      )}
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
};

// export default function StreamErrorBound(): React.ReactElement {
//   return <ErrorBoundary fallback={StreamFailureFallback} />;
// }
export default Stream;
