import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Submissions } from '../../../../api';
import { pastSubs } from '../../../../state';
import { EditProfile } from '../EditProfile';
import { Gallery } from '../Gallery';

const ProfileNav = (): React.ReactElement => {
  // State to show if the gallery or the edit profile
  const [showGallery, setShowGallery] = useState(false);

  // pull list of users top 5 stories from recoil state && the API call getRecentSubsByChild()
  const [list, setList] = useRecoilState(pastSubs.list);
  //
  useEffect(() => {
    Submissions.getMySubmissions()
      .then((subList) => {
        setList(subList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="profile-nav">
      <div className="profile-switcher">
        <span
          className={showGallery ? 'active' : ''}
          onClick={() => setShowGallery(true)}
        >
          Gallery
        </span>
        <span
          className={!showGallery ? 'active' : ''}
          onClick={() => setShowGallery(false)}
        >
          Account
        </span>
      </div>
      <div className="profile-content">
        {showGallery ? <Gallery submissionList={list} /> : <EditProfile />}
      </div>
    </div>
  );
};

export default ProfileNav;
