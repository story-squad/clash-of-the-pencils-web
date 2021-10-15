import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { default as OfflineStreamVideo } from './OfflineStreamVideo';
import './styles/index.scss';

const PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

const streamURL = process.env.REACT_APP_LIVESTREAM_URL;

export default function Stream(): React.ReactElement {
  const [renderFallback, setRenderFallback] = useState(streamURL === undefined);
  const hidePlayer = () => setRenderFallback(true);

  const [playing, setPlaying] = useState(false);
  const stop = () => setPlaying(false);
  const start = () => setPlaying(true);

  return (
    <div className="stream">
      {renderFallback ? (
        <>
          <h2>Latest Livestream</h2>
          <OfflineStreamVideo />
        </>
      ) : (
        <>
          <h2>Stream is Live!</h2>
          <ReactPlayer
            url={streamURL}
            playing={playing}
            onReady={start}
            config={{
              youtube: {
                // TODO Figure out how much of this is actually working
                onUnstarted: (...a) => {
                  console.log('[YTUNSTRT]', a);
                  hidePlayer();
                },
                playerVars: {
                  events: {
                    onStateChange: (
                      stateVal: typeof PlayerState[keyof typeof PlayerState],
                    ) => {
                      console.log('[YTSTCH]', { stateVal });
                      if (stateVal === PlayerState.ENDED) hidePlayer();
                    },
                    onError: (e: unknown) => {
                      console.log('[YTERR]', e);
                      stop();
                      hidePlayer();
                    },
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
