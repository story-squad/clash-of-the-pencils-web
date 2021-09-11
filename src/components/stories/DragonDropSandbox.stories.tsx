import { Meta } from '@storybook/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { DragonBank } from '../molecules';
import SubmissionCardDropZone from '../molecules/SubmissionCard/SubmissionCardDropZone';
import { VotingDragAndDropContext } from '../providers';
import FullscreenImageOverlayContainer from '../views/FullscreenImageOverlay/FullscreenImageOverlayContainer';

const Template = (): React.ReactElement => {
  return (
    <>
      <DragonBank />
      <SubmissionCardDropZone position={1} />
      <SubmissionCardDropZone position={2} />
      <SubmissionCardDropZone position={3} />
    </>
  );
};

export const Default = Template.bind({});

export default {
  title: 'Sandboxes/VotingDragAndDrop',
  decorators: [
    (story) => (
      <RecoilRoot>
        <VotingDragAndDropContext>
          {story()}
          <FullscreenImageOverlayContainer />
        </VotingDragAndDropContext>
      </RecoilRoot>
    ),
  ],
} as Meta;
