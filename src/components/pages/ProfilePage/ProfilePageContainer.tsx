import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { apiError, pastSubs } from '../../../state';
import { Loader } from '../../common';
import RenderProfile from './RenderProfile';

const Profile: React.FC = () => {
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
        setLoadingError(err.message);
      });
  }, []);

  return list ? <RenderProfile /> : <Loader />;
};

export default Profile;
