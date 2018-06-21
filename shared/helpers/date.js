import moment from 'moment-timezone';

export function dateToString(elem, format) {
  const date = moment(elem);
  date.locale('es');

  return date.format(format);
}
