import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './styles/index.scss';

const PlayerState = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

const streamURL =
  'https://www.youtube.com/embed/live_stream?channel=UC0oA3AzYAj0Rnfg2Yhvrnqw';

export default function Stream(): React.ReactElement {
  const [renderFallback, setRenderFallback] = useState(false);
  const hidePlayer = () => setRenderFallback(true);

  const [playing, setPlaying] = useState(false);
  const stop = () => setPlaying(false);
  const start = () => setPlaying(true);

  return (
    <div className="stream">
      {renderFallback ? (
        <>
          <h2>Latest Livestream</h2>
          <OfflineStreamComponent />
        </>
      ) : (
        <>
          <h2>Stream is Live!</h2>
          <ReactPlayer
            playing={playing}
            onReady={start}
            url={streamURL}
            fallback={<OfflineStreamComponent />}
            config={{
              youtube: {
                onUnstarted: hidePlayer,
                playerVars: {
                  events: {
                    onStateChange: (
                      stateVal: typeof PlayerState[keyof typeof PlayerState],
                    ) => {
                      console.log('[YTSTCH]', { stateVal });
                      if (stateVal === PlayerState.ENDED) hidePlayer();
                    },
                    onError: (e: unknown) => {
                      stop();
                      hidePlayer();
                      console.log('[YTERR]', e);
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

export function OfflineStreamComponent(): React.ReactElement {
  return (
    <div className="offline-stream-component">
      <p>Stream is now offline</p>
      {/* TODO put the past stream vid here */}
    </div>
  );
}
