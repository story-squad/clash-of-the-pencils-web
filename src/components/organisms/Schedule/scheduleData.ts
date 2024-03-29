import { time } from '../../../utils';

export default [
  {
    title: 'Every Morning',
    text: 'Sign in to get the new story writing prompt and start scribbling.',
  },
  {
    title: time.schedule.submit.end.toLocal().toFormat('h:mm a'),
    text: 'The deadline to upload your single page story.',
  },
  {
    title: time.schedule.vote.start.toLocal().toFormat('h:mm a'),
    text: 'Finalists are announced and popular voting begins.',
  },
  {
    title: time.schedule.stream.start.toLocal().toFormat('h:mm a'),
    text: 'The winners are announced on the livestream then posted in Top Stories.',
  },
];
