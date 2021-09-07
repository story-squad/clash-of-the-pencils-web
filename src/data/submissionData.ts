import { Submissions } from '../api';
import { handwritingExample, handwritingExampleRotated } from '../assets';
import promptData from './promptData';

export default [
  {
    codename: 'TestUser',
    created_at: new Date(),
    id: 1,
    prompt: promptData[0].prompt,
    rotation: 0,
    score: 75,
    src: handwritingExample,
    userId: 1,
  },
  {
    codename: 'TestUser',
    created_at: new Date(),
    id: 2,
    prompt: promptData[1].prompt,
    rotation: 90,
    score: 55,
    src: handwritingExampleRotated,
    userId: 1,
  },
] as Submissions.ISubItem[];
