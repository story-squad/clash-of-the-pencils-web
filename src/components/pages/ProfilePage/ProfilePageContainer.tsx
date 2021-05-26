import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, auth, pastSubs } from '../../../state';
import { Loader } from '../../common';
import RenderProfilePage from './RenderProfilePage';

const ProfilePageContainer = (): React.ReactElement => {
  // pull list of users top 5 stories from recoil state && the API call getMySubmissions()
  const [list, setList] = useRecoilState(pastSubs.list);
  const setLoadingError = useSetRecoilState(apiError.global);
  const userId = useRecoilValue(auth.userId);

  useEffect(() => {
    // We can coerce the type because they can't access this page without auth
    if (!userId) {
      setLoadingError('Must be logged in to view!');
      return;
    }
    Submissions.getMySubmissions(userId)
      .then((subList) => {
        setList(subList);
        setLoadingError(null);
      })
      .catch((err) => {
        console.log({ err });
        if (err.response?.data?.message) {
          setLoadingError(err.response.data.message);
        } else {
          setLoadingError('Could not load profile.');
        }
      });
  }, []);

  return list ? <RenderProfilePage /> : <Loader />;
};

export default ProfilePageContainer;
