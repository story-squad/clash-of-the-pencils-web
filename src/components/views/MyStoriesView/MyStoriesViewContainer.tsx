import React, { Suspense, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import useAsync from '../../../hooks/useAsync';
import { auth, submissions } from '../../../state';
import { readError } from '../../../utils';
import MyStoriesLoader from './MyStoriesLoader';
import MyStoriesView from './MyStoriesView';

function MyStoriesViewContainer(): React.ReactElement {
  const user = useRecoilValue(auth.user);
  const [subIds, setSubIds] = useRecoilState(submissions.userSubs.list);
  const addUserSubs = useSetRecoilState(submissions.userSubs.add);
  const [subIdDeleted, setSubIdDeleted] = useRecoilState(
    submissions.forceUpdate,
  );
  const [loadSubs, loading, , err] = useAsync({
    asyncFunction: Submissions.getMySubmissions,
    onSuccess: addUserSubs,
  });

  const removeItem = (id: number) => {
    setSubIds((prev) => prev?.filter((el, i) => i !== id));
  };

  useEffect(() => {
    if (!subIds && !loading && user) {
      loadSubs(user.id);
    } else if (user) {
      // removes the item from the id list that was deelted
      removeItem(subIdDeleted);
      // sets the id to 0 refreshing the id list
      setSubIdDeleted(0);
    }
  }, [subIdDeleted]);

  if (err) return <Navigate to={`/error?message=${readError(err)}`} replace />;

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
