import React from 'react';
import { useRecoilValue } from 'recoil';
import { Submissions } from '../../../../api';
import { pastSubs } from '../../../../state';
import { SubCard } from '../../../common';

const Gallery = (): React.ReactElement => {
  const submissionList = useRecoilValue(pastSubs.list);

  return (
    <div className="gallery">
      {(submissionList as Submissions.ISubItem[]).map((pic, i) => (
        <SubCard key={i} {...pic} />
      ))}
      {(submissionList as Submissions.ISubItem[]).length === 0 && (
        <div className="gallery-error">
          <p>You don&apos;t have any past submissions.</p>
          <p>Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
