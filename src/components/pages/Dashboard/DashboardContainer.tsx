import React, { useEffect, useState } from 'react';
import { Submissions } from '../../../api';
import { Loader } from '../../common';
import RenderDashboard from './RenderDashboard';

const Dashboard: React.FC = () => {
  const [picList, setPicList] = useState<Submissions.SubItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Submissions.getRecentSubsByChild(0)
      .then(({ data }) => {
        setTimeout(() => {
          setPicList(data);
          setLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return loading ? <Loader /> : <RenderDashboard picList={picList} />;
};

export default Dashboard;
