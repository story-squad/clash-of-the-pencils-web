import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { default as OfflineStreamVideo } from './OfflineStreamVideo';
import './styles/index.scss';

const streamURL = process.env.REACT_APP_LIVESTREAM_URL;

export default function Stream(): React.ReactElement {
  const [playing, setPlaying] = useState(false);
  const [renderFallback, setRenderFallback] = useState(streamURL === undefined);
  const hidePlayer = () => {
    setRenderFallback(true);
  };
  const onReady = () => {
    setPlaying(true);
  };

  return (
    <div className="stream-wrapper">
      <div className="stream">
        <h2>
          {playing && !renderFallback ? 'Streaming Now!' : 'Latest Livestream'}
        </h2>
        {renderFallback ? (
          <OfflineStreamVideo />
        ) : (
          <ReactPlayer
            url={streamURL}
            playing={playing}
            onReady={onReady}
            onError={hidePlayer}
            stopOnUnmount
            config={{ youtube: { onUnstarted: hidePlayer } }}
          />
        )}
      </div>
    </div>
  );
}
