import React from 'react';
import DragonBankDropZone from './DragonBankDropZone';
import './styles/index.scss';

export default function DragonBank(): React.ReactElement {
  return (
    <div className="dragon-bank">
      <DragonBankDropZone place={1} />
      <DragonBankDropZone place={2} />
      <DragonBankDropZone place={3} />
    </div>
  );
}
