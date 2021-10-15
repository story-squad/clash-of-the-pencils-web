import React, { Suspense } from 'react';
import ReactPlayer from 'react-player';
import { useRecoilValue } from 'recoil';
import { app } from '../../../state';
import { Loader } from '../../atoms';

function OfflineStreamVideo(): React.ReactElement {
  const { url } = useRecoilValue(app.streams.latest);

  return (
    <div className="offline-stream-component">
      {/* TODO put the past stream vid here */}
      <ReactPlayer url={url} />
    </div>
  );
}

export default function OfflineStreamVideoSuspense(): React.ReactElement {
  return (
    <Suspense fallback={<Loader message="Loading past stream" />}>
      <OfflineStreamVideo />
    </Suspense>
  );
}
