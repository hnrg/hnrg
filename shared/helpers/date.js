import moment from 'moment-timezone';

export default function dateToString(elem, format) {
  const date = moment(elem);
  date.locale('es');

  return date.format(format);
}
