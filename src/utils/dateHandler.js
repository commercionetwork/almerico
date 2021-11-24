import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export default {
  chseckIsBefore(d1, d2) {
    return dayjs(d1).isBefore(dayjs(d2));
  },
  checkIsSame(d1, d2, unit = undefined) {
    return dayjs(d1).isSame(d2, unit);
  },
  getFormattedDate(date, style = 'DD/MM/YY') {
    return dayjs(date).format(style);
  },
  getFormattedDifference(d1, d2) {
    const date1 = dayjs(d1);
    const date2 = dayjs(d2);
    const diff = date2.diff(date1);
    return dayjs.duration(diff).humanize(true);
  },
  getSubtractedDate(amount, unit) {
    return dayjs().subtract(amount, unit).utc().format();
  },
  getUtcDate(date) {
    return dayjs(date).utc().format();
  },
};
