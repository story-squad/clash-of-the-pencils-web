import React from 'react';
import { pencilMonsterHead } from '../../../assets';
import './styles/storySquadHeader.scss';

export default function StorySquadHeader(): React.ReactElement {
  return (
    <header className="story-squad-header-wrapper">
      <div className="story-squad-header">
        <img src={pencilMonsterHead} alt="Our pencil monster's head" />
        <h1>Story Squad</h1>
      </div>
    </header>
  );
}
