import React, { useEffect, useState } from 'react';
import { Sub } from '../../../api';
import { Loader } from '../../common';
import RenderDashboard from './RenderDashboard';

const Dashboard: React.FC = () => {
  const [picList, setPicList] = useState<Sub.SubItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Sub.getRecentSubsByChild(0)
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
