import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const dateHandler = {
  getFormattedDifference(d1, d2) {
    const date1 = dayjs(d1);
    const date2 = dayjs(d2);
    const diff = date2.diff(date1);
    return dayjs.duration(diff).humanize(true);
  },
};

export default dateHandler;
