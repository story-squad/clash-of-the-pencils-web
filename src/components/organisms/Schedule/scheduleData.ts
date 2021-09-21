import { time } from '../../../utils';

export default [
  {
    title: 'Every Morning',
    text: 'Sign in to get the new story writing prompt and start scribbling.',
  },
  {
    title: time.schedule.submit.end.toLocal().toFormat('hh:mm'),
    text: 'The deadline to upload your single page story.',
  },
  {
    title: time.schedule.vote.start.toLocal().toFormat('hh:mm'),
    text: 'Finalists are announced and popular voting begins.',
  },
  {
    title: time.schedule.stream.start.toLocal().toFormat('hh:mm'),
    text: 'The winners are announced on the livestream then posted in Top Stories.',
  },
];
