import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { pastSubs } from '../../../state';
import { Submissions } from '../../../api';

import RenderProfile from './RenderProfile';
import { Loader } from '../../common';

const Profile: React.FC = () => {
  const [list, setList] = useRecoilState(pastSubs.list);

  useEffect(() => {
    Submissions.getRecentSubsByChild()
      .then((subList) => {
        setList(subList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return list ? <RenderProfile picList={list} /> : <Loader />;
};

export default Profile;
