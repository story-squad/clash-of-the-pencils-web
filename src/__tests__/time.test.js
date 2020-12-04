import moment from 'moment';
import { time } from '../utils';

describe('time module testing', () => {
  describe('getTimeUntilEvent()', () => {
    const now = moment.utc('01:00:00.0', 'HH:mm:ss.S');
    it('returns 0h30m until sub start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('submit', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(false);
    });
    it('returns 21h30m until voting start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('vote', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(21);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(false);
    });
    it('returns 0h until stream start at 1am UTC', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('stream', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(active).toBe(false);
    });
    it('returns time until end (17h) when passed in a time during an event', () => {
      const cur = moment.utc('05:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('submit', cur);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(17);
      expect(active).toBe(true);
    });
    it('returns (0h30m) time until announcements start', () => {
      const { active, timeUntil } = time.getTimeUntilEvent('announce', now);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(0);
      expect(formattedTime.m).toBe(30);
      expect(active).toBe(false); // active should be true bc we want the announcements to show from 830pm EST to 530pm EST tomorrow
    });
    it('returns 17h time until announcements end from 9pm pst', () => {
      const cur = moment.utc('05:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('announce', cur);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(17);
      expect(formattedTime.m).toBe(0);
      expect(active).toBe(true); // active should be true bc we want the announcements to show from 830pm EST to 530pm EST tomorrow
    });
    it('returns 2h until annoucements end from 12pm pst', () => {
      const cur = moment.utc('20:00:00.0', 'HH:mm:ss.S');
      const { active, timeUntil } = time.getTimeUntilEvent('announce', cur);
      const formattedTime = time.secondsToTime(timeUntil);
      expect(formattedTime.h).toBe(2);
      expect(formattedTime.m).toBe(0);
      expect(active).toBe(true);
    });
  });
});
