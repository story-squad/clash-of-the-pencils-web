import React from 'react';
import { Submissions } from '../../../../api';
import { SubCard } from '../../../common';

interface RenderUserSubmissions {
  submissionList: Submissions.SubItem[];
}

const Gallery = ({
  submissionList,
}: RenderUserSubmissions): React.ReactElement => {
  return (
    <div className="profile-wrapper">
      <div className="mystories-wrapper">
        <div className="profile-story-list">
          <h2>My Stories</h2>
          {submissionList.map((pic, i) => (
            <SubCard key={i} {...pic} />
          ))}
          {submissionList.length === 0 && (
            <div className="profile-story-error-msg">
              You don&apos;t have any past submissions. Check back later!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
