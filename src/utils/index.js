import moment from 'moment';

export function SetTitle(page) {
    document.title = process.env.REACT_APP_APP_NAME + ' | ' + page
}

export function getSeason(month) {
    if (month >= 1 && month < 4) {
        return 'winter';
    } else if (month >= 4 && month < 7) {
        return 'spring';
    } else if (month >= 7 && month < 10) {
        return 'summer';
    } else {
        return 'fall';
    }
}

export function getCurrentSeason() {
    var d = new Date()
    return getSeason(d.getMonth() + 1)
}

export function isCurrentSeason(date) {
    var d = new Date(date)
    var month = d.getMonth() + 1;
    var year = d.getYear();

    var currentYear = new Date().getYear();
    var season = getCurrentSeason();

    if (year !== currentYear) {
        return false
    }

    if (season === "winter") {
        return month >= 1 && month < 4
    } else if (season === "spring") {
        return month >= 4 && month < 7
    } else if (season === "summer") {
        return month >= 7 && month < 10
    } else if (season === "fall") {
        return month >= 10
    }

    return false
}

export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function timeSince(str) {
    return moment(str).subtract(7, 'h').fromNow()
}

export function slugify(str) {
    return str
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]\s+/g, ' ')
        .replace(/\s+/g, "-")
}

export function parseTime(str, fmt) {
    if (moment(str).year() === 1) {
        return ""
    }
    return moment(str).format(fmt);
}

export function parseClock(str, fmt) {
    return moment(str, fmt)
}

export function timeToDuration(str) {
    var duration = ''
    var s = str.split(':')
    if (parseInt(s[0]) !== 0) {
        duration += parseInt(s[0]) + ' hr. '
    }
    if (parseInt(s[1]) !== 0) {
        duration += parseInt(s[1]) + ' min. '
    }
    if (parseInt(s[2]) !== 0) {
        duration += parseInt(s[2]) + ' sec. '
    }
    if (duration === '') {
        duration = '?'
    }
    return duration
}