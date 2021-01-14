import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import tammyB from '../../../../assets/img/guests/tammy-b-13012021.png';

const guestInfo: IGuestInfo = {
  handle: 'inspiretammyb',
  name: 'Tammy B',
  pic: tammyB,
  text: 'Tammy B is an amazing kindergarten teacher and writer!',
};

const SocialMediaGuest = (): React.ReactElement => {
  return (
    <div className="social-media-guest">
      <h2>Teacher Spotlight</h2>
      <div className="content-wrapper">
        <div className="content">
          <div className="top-content">
            <a
              href={`https://www.instagram.com/${guestInfo.handle}/`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={guestInfo.pic}
                alt="Our guest judge's profile picture"
              />
            </a>
            <div className="welcome">
              <p>Welcome our guest judge,</p>
              <p>
                <strong>{guestInfo.name}!</strong>
              </p>
              <p className="blurb">{guestInfo.text}</p>
            </div>
          </div>
          <a
            href={`https://www.instagram.com/${guestInfo.handle}/`}
            target="_blank"
            rel="noreferrer"
          >
            <AiOutlineInstagram />
            <span>{guestInfo.handle}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

interface IGuestInfo {
  handle: string;
  pic: string;
  name: string;
  text: string;
}

export default SocialMediaGuest;
