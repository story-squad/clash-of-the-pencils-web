import React from 'react';
import { nav } from '../../../config';
import { Header, SubCard } from '../../common';

interface RenderDashboardProps {
  picList: { src: string; alt?: string }[];
}

const RenderDashboard = ({
  picList,
}: RenderDashboardProps): React.ReactElement => {
  return (
    <div>
      <Header menuItems={nav.siteNavItems} />
      <div className="dashboard">
        <div className="sidebar">
          <h2>My Stories</h2>
          <div className="story-list">
            {picList.map((pic, i) => (
              <SubCard key={i} {...pic} />
            ))}
          </div>
        </div>
        <div className="content">
          <PromptBox {...prompt} />
        </div>
      </div>
    </div>
  );
};

const PromptBox = (props: PromptBoxProps): React.ReactElement => {
  return (
    <div className="prompt-box">
      <h2>Hey, {props.username}!</h2>
      <h3>Here is today&apos;s prompt:</h3>
      <p>{props.prompt}</p>
      <div className="prompt-footer">
        <div className="streak">
          <h3>Hot Streak:</h3>
          <span className="flames">
            {[...new Array(props.streak)].map(() => '(f)')}
          </span>
        </div>
        <button>Submit Your Story</button>
      </div>
    </div>
  );
};

interface PromptBoxProps {
  username: string;
  prompt: string;
  streak: number;
}

const prompt = {
  username: 'CatLady',
  prompt: 'You are a super hero, and there is a town that needs saving.',
  streak: 3,
};

export default RenderDashboard;
