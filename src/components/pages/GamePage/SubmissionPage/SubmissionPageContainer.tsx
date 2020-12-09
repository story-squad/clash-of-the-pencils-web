import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../../api';
import { pastSubs } from '../../../../state';
import { Loader } from '../../../common';
import RenderSubmissionPage from './RenderSubmissionPage';

const SubmissionPageContainer: React.FC = () => {
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

  return list ? <RenderSubmissionPage list={list} /> : <Loader />;
};

export default SubmissionPageContainer;
