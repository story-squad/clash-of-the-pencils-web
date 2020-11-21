import React, { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { Submissions } from '../../../api';
import { pastSubs } from '../../../state';

import RenderDashboard from './RenderDashboard';
import { Loader } from '../../common';

const Dashboard: React.FC = () => {
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

  return list ? <RenderDashboard picList={list} /> : <Loader />;
};

export default Dashboard;
