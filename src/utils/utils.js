import moment from 'moment';

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
    var yesterday = moment().subtract(1, 'days')
    var d = moment(str).subtract(7, 'h')
    if (d.diff(yesterday, 'days') >= 1) {
        return moment(str).fromNow()
    }
    return d.format('MMM D, YYYY h:mm A')   
}

export function slugify(str) {
    return str
        .toString()
        .trim()
        .toLowerCase()
        // .replace(/[^a-zA-Z0-9]\s+/g,' ')
        .replace(/[^\w ]+/g,'')
        .replace(/\s+/g, "-")
}

export function parseTime(str, fmt) {
    if (moment(str).year()=== 1) {
        return ""
    }
    return moment(str).format(fmt);
}

export function ellipsis(str, limit) {
    if (str.length > limit) {
        str = str.substring(0, limit) + "..."
    }
    return str
}

export function cleanKey(str) {
    str = str.replace(/_/g,' ')
    return str[0].toUpperCase() + str.slice(1)
}

export function params(params) {
    return new URLSearchParams(params).toString()
}