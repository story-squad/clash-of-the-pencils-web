import moment from 'moment';
import { time } from '../utils';

describe('time module testing', () => {
  describe('getTimeUntilEvent()', () => {
    const now = moment.utc('01:00:00.0', 'HH:mm:ss.S');
    it('returns 0h30m until sub start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('submit', now);
      expect(timeUntil.h).toBe(0);
      expect(timeUntil.m).toBe(30);
      expect(active).toBe(false);
    });
    it('returns 19h30m until voting start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('vote', now);
      expect(timeUntil.h).toBe(19);
      expect(timeUntil.m).toBe(30);
      expect(active).toBe(false);
    });
    it('returns 22h until stream start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('stream', now);
      expect(timeUntil.h).toBe(22);
      expect(active).toBe(false);
    });
    it('returns time until end (15h) when passed in a time during an event', () => {
      const cur = moment.utc('05:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('submit', cur);
      expect(timeUntil.h).toBe(15);
      expect(active).toBe(true);
    });
    it('returns (20h:30m) time until announcements end', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('announce', now);
      expect(timeUntil.h).toBe(20);
      expect(timeUntil.m).toBe(30);
      expect(active).toBe(true); // active should be true bc we want the announcements to show from 830pm EST to 530pm EST tomorrow
    });
  });
});
