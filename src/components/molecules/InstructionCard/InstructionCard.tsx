import React from 'react';
import { Card } from '../../atoms';
import instructions, { getBadgeForStep } from './instructions';
import './styles/index.scss';

export interface InstructionCardProps {
  step: number;
}

export default function InstructionCard({
  step,
}: InstructionCardProps): React.ReactElement {
  return (
    <Card className="instruction-card">
      {getBadgeForStep(step)}
      <h2>{instructions[step - 1].header}</h2>
      <p>{instructions[step - 1].body}</p>
    </Card>
  );
}
