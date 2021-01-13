import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, pastSubs } from '../../../state';
import { Loader } from '../../common';
import RenderProfilePage from './RenderProfilePage';

const ProfilePageContainer = (): React.ReactElement => {
  // pull list of users top 5 stories from recoil state && the API call getMySubmissions()
  const [list, setList] = useRecoilState(pastSubs.list);
  const setLoadingError = useSetRecoilState(apiError.global);

  useEffect(() => {
    Submissions.getMySubmissions()
      .then((subList) => {
        setList(subList);
        setLoadingError(null);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === 'Network Error') {
          setLoadingError('Could not load profile.');
        } else {
          setLoadingError(err.message);
        }
      });
  }, []);

  return list ? <RenderProfilePage /> : <Loader />;
};

export default ProfilePageContainer;
