import React from 'react';
import { pencilMonster } from '../../../assets';

export default function NameAndPencil(): React.ReactElement {
  return (
    <div className="name-and-pencil">
      <img src={pencilMonster} alt="Story Squad pencil monster" />
      <p>&#169;2021 Story Squad HQ</p>
    </div>
  );
}
