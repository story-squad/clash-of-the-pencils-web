import React from 'react';
import { PencilMonster } from '../../../assets';

export default function NameAndPencil(): React.ReactElement {
  return (
    <div className="name-and-pencil">
      <PencilMonster />
      <p>&#169;2021 Story Squad HQ</p>
    </div>
  );
}
