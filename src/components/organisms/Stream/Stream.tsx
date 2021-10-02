import React from 'react';
import { Button } from '../../atoms';
import './styles/index.scss';

export interface IStreamProps {
  channelId?: string;
  apiKey?: string;
}

export default function Stream({
  apiKey,
  channelId,
}: IStreamProps): React.ReactElement {
  const revealChampion = () => undefined;
  return (
    <div className="stream-wrapper">
      <div className="stream">
        {/* <ReactLivestream
          platform="youtube"
          youtubeApiKey={apiKey}
          youtubeChannelId={channelId}
          offlineComponent={OfflineStreamComponent}
        /> */}
        <Button onClick={revealChampion}>Reveal Champion</Button>
      </div>
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
