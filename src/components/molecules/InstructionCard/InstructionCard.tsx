import { classnames } from '@story-squad/react-utils';
import React from 'react';
import { Card } from '../../atoms';
import instructions, { getBadgeForStep } from './instructions';
import './styles/index.scss';

export interface InstructionCardProps {
  step: number;
  active?: boolean;
}

export default function InstructionCard({
  step,
  active = false,
}: InstructionCardProps): React.ReactElement {
  return (
    <Card className={classnames('instruction-card', { active })}>
      {getBadgeForStep(step)}
      <h2>{instructions[step - 1].header}</h2>
      <p>{instructions[step - 1].body}</p>
    </Card>
  );
}
