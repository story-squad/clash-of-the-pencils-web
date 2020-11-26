import React from 'react';
import { Countdown } from '../../../common';
import RenderReadSubmissions from './RenderReadSubmissions';

const ReadSubmissionsContainer = (
  props: Countdown.CountdownComponentProps,
): React.ReactElement => {
  return <RenderReadSubmissions {...props} />;
};

export default ReadSubmissionsContainer;
