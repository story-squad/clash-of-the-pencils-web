import React from 'react';
import { useRecoilValue } from 'recoil';
import { voting } from '../../../state';
import DragonBankDropZone from './DragonBankDropZone';
import './styles/index.scss';

export default function DragonBank(): React.ReactElement {
  const dragonBankKeys = useRecoilValue(voting.dragonBankDropZoneKeys);
  return (
    <div className="dragon-bank">
      {dragonBankKeys.map((key) => (
        <DragonBankDropZone key={key} name={key} />
      ))}
    </div>
  );
}
