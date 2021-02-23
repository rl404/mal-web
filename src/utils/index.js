import moment from 'moment';
import * as cons from '../constant';

export function slugify(str) {
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]\s+/g, ' ')
    .replace(/\//g, "-")
    .replace(/\s+/g, "-");
}

export function getSeason(month) {
  if (month >= 1 && month < 4) {
    return cons.SEASON_WINTER;
  } else if (month >= 4 && month < 7) {
    return cons.SEASON_SPRING;
  } else if (month >= 7 && month < 10) {
    return cons.SEASON_SUMMER;
  } else {
    return cons.SEASON_FALL;
  }
}

export function getCurrentSeason() {
  var d = new Date();
  return getSeason(d.getMonth() + 1);
}

export function ellipsis(str, limit) {
  if (limit !== 0 && str.length > limit) {
    return str.substring(0, limit) + '...';
  }
  return str;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseTime(str, fmt) {
  if (moment(str).year() === 1) {
    return '';
  }
  return moment(str).format(fmt);
}

const months = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function malToDate(date) {
  if (date.year != 0) {
    if (date.month != 0) {
      if (date.day != 0) {
        return date.day.toString() + ' ' + months[date.month].substring(0, 3) + ' ' + date.year.toString();
      } else {
        return months[date.month].substring(0, 3) + ' ' + date.year.toString();
      }
    } else {
      return date.year.toString();
    }
  } else {
    return '?';
  }
}

export function timeToDuration(str) {
  var duration = '';
  var s = str.split(':');
  if (parseInt(s[0]) !== 0) {
    duration += parseInt(s[0]) + ' hr. ';
  }
  if (parseInt(s[1]) !== 0) {
    duration += parseInt(s[1]) + ' min. ';
  }
  if (parseInt(s[2]) !== 0) {
    duration += parseInt(s[2]) + ' sec. ';
  }
  if (duration === '') {
    duration = '?';
  }
  return duration;
}

export function parseClock(str, fmt) {
  return moment(str, fmt);
}

export function splitCamel(str) {
  return str.split(/([A-Z][a-z]+)/)
    .filter(function (e) { return e })
    .map(s => s.toLowerCase())
    .join(' ');
}