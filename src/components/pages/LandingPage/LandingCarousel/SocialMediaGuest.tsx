import React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';

const guestInfo: IGuestInfo = {
  handle: 'colorcoffeeandchaos',
  name: 'Barbara Jones',
  pic:
    'https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-19/s150x150/52995629_2209235015995215_3952522694427148288_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_ohc=lkxxgKnm5OQAX8BZ73O&tp=1&oh=779b674bde3cf8b6fdb8911b586389c3&oe=60275C2B',
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
                <strong>Barbara Jones!</strong>
              </p>
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
}

export default SocialMediaGuest;
