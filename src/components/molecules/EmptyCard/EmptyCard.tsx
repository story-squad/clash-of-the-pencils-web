import React from 'react';
import { emptyCardBackground } from '../../../assets';
import { Card } from '../../atoms';
import './styles/index.scss';

export default function EmptyCard(): React.ReactElement {
  return (
    <Card
      className="empty-card"
      style={{
        backgroundImage: `url(${emptyCardBackground})`,
      }}
    >
      <p>?</p>
    </Card>
  );
}
