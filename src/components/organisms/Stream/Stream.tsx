import React from 'react';
import ReactLivestream from 'react-livestream';
import './styles/index.scss';

export interface IStreamProps {
  channelId: string;
  apiKey: string;
}

export default function Stream({
  apiKey,
  channelId,
}: IStreamProps): React.ReactElement {
  return (
    <div className="stream">
      <ReactLivestream
        platform="youtube"
        youtubeApiKey={apiKey}
        youtubeChannelId={channelId}
        offlineComponent={OfflineStreamComponent}
      />
    </div>
  );
}

export function OfflineStreamComponent(): React.ReactElement {
  return (
    <div className="offline-stream-component">
      <p>Stream is currently offline</p>
    </div>
  );
}
