import { DateTime } from 'luxon';
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
    user_id: 1,
    dob: DateTime.now().minus({ years: 18 }).toISO(),
  },
  {
    codename: 'TestUser',
    created_at: new Date(),
    id: 2,
    prompt: promptData[1].prompt,
    rotation: 90,
    score: 55,
    src: handwritingExampleRotated,
    user_id: 1,
    dob: DateTime.now().minus({ years: 18 }).toISO(),
  },
  {
    codename: 'TestUser',
    created_at: new Date(),
    id: 3,
    prompt: promptData[2].prompt,
    rotation: 0,
    score: 100,
    src: handwritingExample,
    user_id: 1,
    dob: DateTime.now().minus({ years: 18 }).toISO(),
  },
] as Submissions.ISubItem[];
