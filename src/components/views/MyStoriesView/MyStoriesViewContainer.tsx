import { useAsync } from '@story-squad/react-utils';
import React, { Suspense, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { auth, submissions } from '../../../state';
import MyStoriesLoader from './MyStoriesLoader';
import MyStoriesView from './MyStoriesView';

function MyStoriesViewContainer(): React.ReactElement {
  const user = useRecoilValue(auth.user);
  const subIds = useRecoilValue(submissions.userSubs.list);
  const addUserSubs = useSetRecoilState(submissions.userSubs.add);

  const [loadSubs, loading] = useAsync({
    asyncFunction: Submissions.getMySubmissions,
    onSuccess: addUserSubs,
  });

  useEffect(() => {
    if (!subIds && !loading && user) loadSubs(user.id);
  });

  return subIds ? (
    <MyStoriesView submissionIds={subIds} />
  ) : (
    <MyStoriesLoader />
  );
}

export default function MyStoriesViewContainerSuspense(): React.ReactElement {
  return (
    <Suspense fallback={<MyStoriesLoader />}>
      <MyStoriesViewContainer />
    </Suspense>
  );
}
