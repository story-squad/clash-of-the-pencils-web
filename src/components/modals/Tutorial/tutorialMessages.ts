import { greenArrow } from '../../../assets';
import { IDS } from '../../../config/tutorialSelectionIds';

export const tutorialMessages: {
  message: string;
  arrow?: string;
  id?: string;
  classname?: string;
  styleclass?: string;
}[] = [
  {
    message: 'Each day a new prompt will be displayed on the dashboard.',
    arrow: greenArrow,
    id: IDS.ID_PROMPT,
    classname: 'tutorial-container',
  },
  {
    message: 'If you need a little help getting started, click here!',
    arrow: greenArrow,
    id: IDS.ID_ENCOURAGEMENT,
    classname: 'tutorial-container',
  },
  {
    message: 'When you’re done writing, submit a story to earn points.',
    arrow: greenArrow,
    id: IDS.ID_UPLOAD,
    classname: 'tutorial-container',
  },
  {
    message:
      'The countdown timer will tell you how much time is left in each stage of the game.',
    arrow: greenArrow,
    id: IDS.ID_TIMER,
    classname: 'tutorial-container',
  },
  {
    message:
      'Each story is analyzed by a super high tech data science engine that awards points based on story development, reader engagement, and creativity.',
    classname: 'tutorial-container',
  },
  {
    message:
      'Every day, the top 3 stories voted on to determine the daily winner. The player with the most points at the end of the week is crowned the champion!',
    arrow: greenArrow,
    id: IDS.ID_TOP_THREE,
    classname: 'tutorial-top',
    styleclass: 'arrow-flip',
  },
  {
    message:
      'Results are announced via livestream every Monday through Friday at 8pm EST / 5pm PST where we break down the highlights, analyze the winning stories, and offer some secret tips for how to score higher.',
    arrow: greenArrow,
    id: IDS.ID_STREAM,
    classname: 'tutorial-top',
    styleclass: 'arrow-flip',
  },
  {
    message:
      'Check the leaderboard each day to see where you rank amoung other players!',
    arrow: greenArrow,
    id: IDS.ID_LEADERBOARD,
    classname: 'tutorial-leaderboard',
    styleclass: 'arrow-sideways',
  },
  {
    message:
      'If you ever need to refresh your memory about how to play, you can access the tutorial any time by clicking here.',
    arrow: greenArrow,
    id: IDS.ID_REFRESH,
    classname: 'tutorial-redo',
  },
];
