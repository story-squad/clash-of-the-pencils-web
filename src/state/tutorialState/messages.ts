import { greenArrow } from '../../assets';
import { TUTORIAL_IDS } from '../../config';

export interface TutorialMessage {
  message: string;
  arrow?: string;
  id?: string;
  classname?: string;
  styleclass?: string;
}

export const messages: TutorialMessage[] = [
  {
    message: 'Each day a new prompt will be displayed on the dashboard.',
    arrow: greenArrow,
    id: TUTORIAL_IDS.ID_PROMPT,
    classname: 'tutorial-container',
  },
  // {
  //   message: 'If you need a little help getting started, click here!',
  //   arrow: greenArrow,
  //   id: TUTORIAL_IDS.ID_ENCOURAGEMENT,
  //   classname: 'tutorial-container',
  // },
  {
    message: 'When you’re done writing, submit a story to earn points.',
    arrow: greenArrow,
    id: TUTORIAL_IDS.ID_UPLOAD,
    classname: 'tutorial-container',
  },
  {
    message:
      'The countdown timer will tell you how much time is left in each stage of the game.',
    arrow: greenArrow,
    id: TUTORIAL_IDS.ID_TIMER,
    classname: 'tutorial-container',
  },
  {
    message:
      'Each story is analyzed by a super high tech data science engine that awards points based on story development, reader engagement, and creativity.',
    classname: 'tutorial-plain',
  },
  {
    message:
      'Every day, the top 3 stories voted on to determine the daily winner. The player with the most points at the end of the week is crowned the champion!',
    arrow: greenArrow,
    id: TUTORIAL_IDS.ID_TOP_THREE,
    classname: 'tutorial-top',
    styleclass: 'arrow-flip',
  },
  {
    message:
      'Results are announced via livestream every Monday through Friday at 8pm EST / 5pm PST where we break down the highlights, analyze the winning stories, and offer some secret tips for how to score higher.',
    arrow: greenArrow,
    id: TUTORIAL_IDS.ID_STREAM,
    classname: 'tutorial-top',
    styleclass: 'arrow-flip',
  },
  {
    message:
      'Check the leaderboard each day to see where you rank among other players!',
    arrow: greenArrow,
    id: TUTORIAL_IDS.ID_LEADERBOARD,
    classname: 'tutorial-leaderboard',
    styleclass: 'arrow-sideways',
  },
];
