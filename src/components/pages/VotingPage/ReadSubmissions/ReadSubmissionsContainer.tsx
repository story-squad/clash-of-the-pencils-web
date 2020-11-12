import React, { useEffect, useState } from 'react';
import { Submissions } from '../../../../api';
import { Loader } from '../../../common';
import RenderReadSubmissions from './RenderReadSubmissions';

const ReadSubmissionsContainer = (
  props: ReadSubmissionsContainerProps,
): React.ReactElement => {
  const [readCount, setReadCount] = useState(0);
  const [viewed, setViewed] = useState([false, false, false]);
  const [list, setList] = useState<null | Submissions.SubItem[]>(null);

  const incrementCount = (index: number) => {
    if (!viewed[index]) {
      setViewed((cur) => [
        ...cur.slice(0, index),
        true,
        ...cur.slice(index + 1),
      ]);
      setReadCount((cur) => cur + 1);
    }
  };

  useEffect(() => {
    console.log('API call goes here');
    Submissions.getTop3Subs()
      .then((res) => {
        setTimeout(() => {
          setList(res.data);
        }, 750);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return list ? (
    <RenderReadSubmissions
      markAsRead={props.markAsRead}
      incrementCount={incrementCount}
      readCount={readCount}
      list={list}
    />
  ) : (
    <Loader />
  );
};

interface ReadSubmissionsContainerProps {
  markAsRead: () => void;
}

export default ReadSubmissionsContainer;
