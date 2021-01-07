import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { pastSubs } from '../../../state';
import { Loader } from '../../common';
import RenderProfile from './RenderProfile';

const Profile: React.FC = () => {
  // pull list of users top 5 stories from recoil state && the API call getRecentSubsByChild()
  const [list, setList] = useRecoilState(pastSubs.list);

  useEffect(() => {
    Submissions.getMySubmissions()
      .then((subList) => {
        setList(subList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return list ? <RenderProfile /> : <Loader />;
};

export default Profile;
