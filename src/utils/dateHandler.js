import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

const dateHandler = {
  getDifference(d1, d2) {
    const date1 = dayjs(d1);
    const date2 = dayjs(d2);
    return date2.diff(date1);
  },
  getFormattedDate(date) {
    return dayjs(date).format('DD/MM/YY');
  },
  getFormattedDifference(d1, d2) {
    const date1 = dayjs(d1);
    const date2 = dayjs(d2);
    const diff = date2.diff(date1);
    return dayjs.duration(diff).humanize(true);
  },
  getAddedDate(amount, unit) {
    return dayjs()
      .add(amount, unit)
      .utc()
      .format();
  },
  getSubtractedDate(amount, unit) {
    return dayjs()
      .subtract(amount, unit)
      .utc()
      .format();
  },
  getUtcDate(date) {
    return dayjs(date)
      .utc()
      .format();
  },
};

export default dateHandler;
