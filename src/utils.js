import moment from 'moment-timezone';
import { timezone } from './files/config.json';

export const formatDate = (dateArg, format) =>
  moment.tz(dateArg, timezone).format(format || 'MMM DD YYYY, hh:mm a z');

export const getMomentTz = (dateArg) => moment.tz(dateArg, timezone);
