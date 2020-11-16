import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { pastSubs, user } from '../../../state';

import RenderDashboard from './RenderDashboard';
import { Loader } from '../../common';
import { useRecoilValue } from 'recoil';

const Dashboard: React.FC = () => {
  const [list, setList] = useRecoilState(pastSubs.list);
  const userId = useRecoilValue(user.userId);

  useEffect(() => {
    if (userId)
      Submissions.getRecentSubsByChild(userId)
        .then(({ data }) => {
          setTimeout(() => {
            setList(data);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [userId]);

  return list ? <RenderDashboard picList={list} /> : <Loader />;
};

export default Dashboard;
