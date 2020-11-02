import { getCurrentEvent } from '../utils/time';
import moment from 'moment';

describe('time module testing', () => {
  describe('getCurrentEvent()', () => {
    it('should return SUBMIT during sub hours', () => {
      const subTime = moment.utc().hour(6);
      expect(getCurrentEvent(subTime)).toBe('SUBMIT');
    });
    it('should return DELIB during delib hours', () => {
      const delibTime = moment.utc().hour(20).minutes(15);
      expect(getCurrentEvent(delibTime)).toBe('DELIB');
    });
    it('should return VOTE during voting hours', () => {
      const voteTime = moment.utc().hour(20).minutes(30);
      expect(getCurrentEvent(voteTime)).toBe('VOTE');
    });
    it('should return STREAM during stream hours', () => {
      const delibTime = moment.utc().hour(23).minutes(59);
      expect(getCurrentEvent(delibTime)).toBe('STREAM');
    });
    it('should return NONE during interim hours', () => {
      const delibTime = moment.utc().hour(0);
      expect(getCurrentEvent(delibTime)).toBe('NONE');
    });
    it('should return NONE during interim hours', () => {
      const delibTime = moment.utc().hour(24);
      expect(getCurrentEvent(delibTime)).toBe('NONE');
    });
  });
});
