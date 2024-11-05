import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function getCurrentDate() {
  return dayjs().utc().format('MMMM D, YYYY HH:mm:ss UTC');
}
