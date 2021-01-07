import React from 'react';
import { Submissions } from '../../../api';
import { Header, SubCard } from '../../common';
import { ProfileNav } from './Nav';

interface RenderProfileProps {
  picList: Submissions.SubItem[];
}

const RenderProfile = ({ picList }: RenderProfileProps): React.ReactElement => {
  return (
    <div>
      <Header />
      <ProfileNav />
      <div className="profile-wrapper">
        <div className="mystories-wrapper">
          <div className="profile-story-list">
            <h2>My Stories</h2>
            {picList.map((pic, i) => (
              <SubCard key={i} {...pic} />
            ))}
            {picList.length === 0 && (
              <div className="profile-story-error-msg">
                You don&apos;t have any past submissions. Check back later!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderProfile;
