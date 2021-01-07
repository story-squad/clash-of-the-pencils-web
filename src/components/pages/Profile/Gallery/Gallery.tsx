import React from 'react';
import { useRecoilValue } from 'recoil';
import { SubItem } from '../../../../api/Submissions';
import { pastSubs } from '../../../../state';
import { SubCard } from '../../../common';

const Gallery = (): React.ReactElement => {
  const submissionList = useRecoilValue(pastSubs.list);

  return (
    <div className="profile-wrapper">
      {(submissionList as SubItem[]).map((pic, i) => (
        <SubCard key={i} {...pic} />
      ))}
      {(submissionList as SubItem[]).length === 0 && (
        <div className="profile-story-error-msg">
          You don&apos;t have any past submissions. Check back later!
        </div>
      )}
    </div>
  );
};

export default Gallery;
