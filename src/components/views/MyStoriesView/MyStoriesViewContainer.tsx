import { useAsync } from '@story-squad/react-utils';
import React, { Suspense, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { auth, submissions } from '../../../state';
import { readError } from '../../../utils';
import MyStoriesLoader from './MyStoriesLoader';
import MyStoriesView from './MyStoriesView';

function MyStoriesViewContainer(): React.ReactElement {
  const user = useRecoilValue(auth.user);
  const subIds = useRecoilValue(submissions.userSubs.list);
  const addUserSubs = useSetRecoilState(submissions.userSubs.add);

  const [loadSubs, loading, , err] = useAsync({
    asyncFunction: Submissions.getMySubmissions,
    onSuccess: addUserSubs,
  });

  useEffect(() => {
    if (!subIds && !loading && user) loadSubs(user.id);
  }, []);

  if (err) return <Redirect to={`/error?message=${readError(err)}`} />;

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
