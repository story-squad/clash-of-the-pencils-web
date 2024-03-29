import React, { Suspense } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilValue } from 'recoil';
import { TUTORIAL_IDS } from '../../../config';
import { app } from '../../../state';
import { Loader } from '../../atoms';
import StreamFailureFallback from './StreamFailureFallback';
import StreamWrapper from './StreamWrapper';

function OfflineStreamVideo(): React.ReactElement {
  const { url } = useRecoilValue(app.streams.latest);

  return (
    <StreamWrapper id={TUTORIAL_IDS.ID_STREAM}>
      {url ? (
        <>
          <h2>Latest Stream</h2>
          <ReactPlayer
            url={url}
            controls
            onEnded={() => console.log('ended')}
            onError={(e) => {
              throw e;
            }}
          />
        </>
      ) : (
        <StreamFailureFallback />
      )}
    </StreamWrapper>
  );
}

export default function OfflineStreamVideoSuspense(): React.ReactElement {
  return (
    <Suspense fallback={<Loader message="Loading past stream" />}>
      <OfflineStreamVideo />
    </Suspense>
  );
}
