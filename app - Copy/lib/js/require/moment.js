// Moment.js
//
// (c) 2011 Tim Wood
// Moment.js is freely distributable under the terms of the MIT license.
//
// Version 1.2.0
define(["tibbr"], function (Tibbr) {

    return (function (Date, undefined) {

        var moment,
            round = Math.round,
            languages = {},
            hasModule = (typeof module !== 'undefined'),
            paramsToParse = 'months|monthsShort|weekdays|weekdaysShort|longDateFormat|relativeTime|ordinal|meridiem'.split('|'),
            i,
            VERSION = "1.2.0",
            shortcuts = 'Month|Date|Hours|Minutes|Seconds'.split('|');

        // left zero fill a number
        // see http://jsperf.com/left-zero-filling for performance comparison
        function leftZeroFill(number, targetLength) {
            var output = number + '';
            while (output.length < targetLength) {
                output = '0' + output;
            }
            return output;
        }

        // helper function for _.addTime and _.subtractTime
        function dateAddRemove(date, _input, adding, val) {
            var isString = (typeof _input === 'string'),
                input = isString ? {} : _input,
                ms, d, M, currentDate;
            if (isString && val) {
                input[_input] = val;
            }
            ms = (input.ms || input.milliseconds || 0) +
                (input.s || input.seconds || 0) * 1e3 + // 1000
                (input.m || input.minutes || 0) * 6e4 + // 1000 * 60
                (input.h || input.hours || 0) * 36e5; // 1000 * 60 * 60
            d = (input.d || input.days || 0) +
                (input.w || input.weeks || 0) * 7;
            M = (input.M || input.months || 0) +
                (input.y || input.years || 0) * 12;
            if (ms) {
                date.setTime(+date + ms * adding);
            }
            if (d) {
                date.setDate(date.getDate() + d * adding);
            }
            if (M) {
                currentDate = date.getDate();
                date.setDate(1);
                date.setMonth(date.getMonth() + M * adding);
                date.setDate(Math.min(new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(), currentDate));
            }
            return date;
        }

        // check if is an array
        function isArray(input) {
            return Object.prototype.toString.call(input) === '[object Array]';
        }

        // convert an array to a date.
        // the array should mirror the parameters below
        // note: all values past the year are optional and will default to the lowest possible value.
        // [year, month, day , hour, minute, second, millisecond]
        function dateFromArray(input) {
            return new Date(input[0], input[1] || 0, input[2] || 1, input[3] || 0, input[4] || 0, input[5] || 0, input[6] || 0);
        }

        // format date using native date object
        function formatDate(date, inputString) {
            var currentMonth = date.getMonth(),
                currentDate = date.getDate(),
                currentYear = date.getFullYear(),
                currentDay = date.getDay(),
                currentHours = date.getHours(),
                currentMinutes = date.getMinutes(),
                currentSeconds = date.getSeconds(),
                currentZone = date.getTimezoneOffset(),
                charactersToReplace = /(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|zz?|ZZ?|LL?L?L?)/g,
                nonuppercaseLetters = /[^A-Z]/g,
                timezoneRegex = /\([A-Za-z ]+\)|:[0-9]{2} [A-Z]{3} /g,
                ordinal = moment.ordinal,
                meridiem = moment.meridiem;
            // check if the character is a format
            // return formatted string or non string.
            //
            // uses switch/case instead of an object of named functions (like http://phpjs.org/functions/date:380)
            // for minification and performance
            // see http://jsperf.com/object-of-functions-vs-switch for performance comparison
            function replaceFunction(input) {
                // create a couple variables to be used later inside one of the cases.
                var a, b;
                switch (input) {
                    // MONTH
                    case 'M' :
                        return currentMonth + 1;
                    case 'Mo' :
                        return (currentMonth + 1) + ordinal(currentMonth + 1);
                    case 'MM' :
                        return leftZeroFill(currentMonth + 1, 2);
                    case 'MMM' :
                        return moment.monthsShort[currentMonth];
                    case 'MMMM' :
                        return moment.months[currentMonth];
                    // DAY OF MONTH
                    case 'D' :
                        return currentDate;
                    case 'Do' :
                        return currentDate + ordinal(currentDate);
                    case 'DD' :
                        return leftZeroFill(currentDate, 2);
                    // DAY OF YEAR
                    case 'DDD' :
                        a = new Date(currentYear, currentMonth, currentDate);
                        b = new Date(currentYear, 0, 1);
                        return ~~(((a - b) / 864e5) + 1.5);
                    case 'DDDo' :
                        a = replaceFunction('DDD');
                        return a + ordinal(a);
                    case 'DDDD' :
                        return leftZeroFill(replaceFunction('DDD'), 3);
                    // WEEKDAY
                    case 'd' :
                        return currentDay;
                    case 'do' :
                        return currentDay + ordinal(currentDay);
                    case 'ddd' :
                        return moment.weekdaysShort[currentDay];
                    case 'dddd' :
                        return moment.weekdays[currentDay];
                    // WEEK OF YEAR
                    case 'w' :
                        a = new Date(currentYear, currentMonth, currentDate - currentDay + 5);
                        b = new Date(a.getFullYear(), 0, 4);
                        return ~~((a - b) / 864e5 / 7 + 1.5);
                    case 'wo' :
                        a = replaceFunction('w');
                        return a + ordinal(a);
                    case 'ww' :
                        return leftZeroFill(replaceFunction('w'), 2);
                    // YEAR
                    case 'YY' :
                        return leftZeroFill(currentYear % 100, 2);
                    case 'YYYY' :
                        return currentYear;
                    // AM / PM
                    case 'a' :
                        return currentHours > 11 ? meridiem.pm : meridiem.am;
                    case 'A' :
                        return currentHours > 11 ? meridiem.PM : meridiem.AM;
                    // 24 HOUR
                    case 'H' :
                        return currentHours;
                    case 'HH' :
                        return leftZeroFill(currentHours, 2);
                    // 12 HOUR
                    case 'h' :
                        return currentHours % 12 || 12;
                    case 'hh' :
                        return leftZeroFill(currentHours % 12 || 12, 2);
                    // MINUTE
                    case 'm' :
                        return currentMinutes;
                    case 'mm' :
                        return leftZeroFill(currentMinutes, 2);
                    // SECOND
                    case 's' :
                        return currentSeconds;
                    case 'ss' :
                        return leftZeroFill(currentSeconds, 2);
                    // TIMEZONE
                    case 'zz' :
                    // depreciating 'zz' fall through to 'z'
                    case 'z' :
                        return (date.toString().match(timezoneRegex) || [''])[0].replace(nonuppercaseLetters, '');
                    case 'Z' :
                        return (currentZone > 0 ? '+' : '-') + leftZeroFill(~~(currentZone / 60), 2) + ':' + leftZeroFill(~~(currentZone % 60), 2);
                    case 'ZZ' :
                        return (currentZone > 0 ? '+' : '-') + leftZeroFill(~~(10 * currentZone / 6), 4);
                    // LONG DATES
                    case 'L' :
                    case 'LL' :
                    case 'LLL' :
                    case 'LLLL' :
                        return formatDate(date, moment.longDateFormat[input]);
                    // DEFAULT
                    default :
                        return input.replace("\\", "");
                }
            }

            return inputString.replace(charactersToReplace, replaceFunction);
        }

        // date from string and format string
        function makeDateFromStringAndFormat(string, format) {
            var inArray = [0, 0, 1, 0, 0, 0, 0],
                timezoneHours = 0,
                timezoneMinutes = 0,
                isUsingUTC = false,
                tokenCharacters = /(\\)?(MM?|DD?D?D?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|ZZ?)/g,
                inputCharacters = /(\\)?([0-9]+|am|pm|([\+\-]\d\d:?\d\d))/gi,
                timezoneParseRegex = /([\+\-]|\d\d)/gi,
                inputParts = string.match(inputCharacters),
                formatParts = format.match(tokenCharacters),
                i,
                isPm;

            // function to convert string input to date
            function addTime(format, input) {
                var a;
                switch (format) {
                    // MONTH
                    case 'M' :
                    // fall through to MM
                    case 'MM' :
                        inArray[1] = ~~input - 1;
                        break;
                    // DAY OF MONTH
                    case 'D' :
                    // fall through to DDDD
                    case 'DD' :
                    // fall through to DDDD
                    case 'DDD' :
                    // fall through to DDDD
                    case 'DDDD' :
                        inArray[2] = ~~input;
                        break;
                    // YEAR
                    case 'YY' :
                        input = ~~input;
                        inArray[0] = input + (input > 70 ? 1900 : 2000);
                        break;
                    case 'YYYY' :
                        inArray[0] = ~~Math.abs(input);
                        break;
                    // AM / PM
                    case 'a' :
                    // fall through to A
                    case 'A' :
                        isPm = (input.toLowerCase() === 'pm');
                        break;
                    // 24 HOUR
                    case 'H' :
                    // fall through to hh
                    case 'HH' :
                    // fall through to hh
                    case 'h' :
                    // fall through to hh
                    case 'hh' :
                        inArray[3] = ~~input;
                        break;
                    // MINUTE
                    case 'm' :
                    // fall through to mm
                    case 'mm' :
                        inArray[4] = ~~input;
                        break;
                    // SECOND
                    case 's' :
                    // fall through to ss
                    case 'ss' :
                        inArray[5] = ~~input;
                        break;
                    // TIMEZONE
                    case 'Z' :
                    // fall through to ZZ
                    case 'ZZ' :
                        isUsingUTC = true;
                        a = input.match(timezoneParseRegex);
                        if (a[1]) {
                            timezoneHours = ~~a[1];
                        }
                        if (a[2]) {
                            timezoneMinutes = ~~a[2];
                        }
                        // reverse offsets
                        if (a[0] === '-') {
                            timezoneHours = -timezoneHours;
                            timezoneMinutes = -timezoneMinutes;
                        }
                        break;
                }
            }

            for (i = 0; i < formatParts.length; i++) {
                addTime(formatParts[i], inputParts[i]);
            }
            // handle am pm
            if (isPm && inArray[3] < 12) {
                inArray[3] += 12;
            }
            // if is 12 am, change hours to 0
            if (!isPm && inArray[3] === 12) {
                inArray[3] = 0;
            }
            // handle timezone
            inArray[3] += timezoneHours;
            inArray[4] += timezoneMinutes;
            // return
            return isUsingUTC ? new Date(Date.UTC.apply({}, inArray)) : dateFromArray(inArray);
        }

        // compare two arrays, return the number of differences
        function compareArrays(array1, array2) {
            var len = Math.min(array1.length, array2.length),
                lengthDiff = Math.abs(array1.length - array2.length),
                diffs = 0,
                i;
            for (i = 0; i < len; i++) {
                if (~~array1[i] !== ~~array2[i]) {
                    diffs++;
                }
            }
            return diffs + lengthDiff;
        }

        // date from string and array of format strings
        function makeDateFromStringAndArray(string, formats) {
            var output,
                inputCharacters = /(\\)?([0-9]+|am|pm|([\+\-]\d\d:?\d\d))/gi,
                inputParts = string.match(inputCharacters),
                scores = [],
                scoreToBeat = 99,
                i,
                curDate,
                curScore;
            for (i = 0; i < formats.length; i++) {
                curDate = makeDateFromStringAndFormat(string, formats[i]);
                curScore = compareArrays(inputParts, formatDate(curDate, formats[i]).match(inputCharacters));
                if (curScore < scoreToBeat) {
                    scoreToBeat = curScore;
                    output = curDate;
                }
            }
            return output;
        }

        // Moment prototype object
        function Moment(date) {
            this._d = date;
        }

        moment = function (input, format) {
            if (input === null) {
                return null;
            }
            var date;
            // parse UnderscoreDate object
            if (input && input._d instanceof Date) {
                date = new Date(+input._d);
                // parse string and format
            } else if (format) {
                if (isArray(format)) {
                    date = makeDateFromStringAndArray(input, format);
                } else {
                    date = makeDateFromStringAndFormat(input, format);
                }
                // parse everything else
            } else {
                date = input === undefined ? new Date() :
                    input instanceof Date ? input :
                        isArray(input) ? dateFromArray(input) :
                            new Date(input);
            }
            return new Moment(date);
        };

        // version number
        moment.version = VERSION;

        // language switching and caching
        moment.lang = function (key, values) {
            var i, param, req;
            if (values) {
                languages[key] = values;
            }
            if (languages[key]) {
                for (i = 0; i < paramsToParse.length; i++) {
                    param = paramsToParse[i];
                    moment[param] = languages[key][param] || moment[param];
                }
            } else {
                if (hasModule) {
                    req = require('./lang/' + key);
                    moment.lang(key, req);
                }
            }
        };

        // set default language
        //tibbr: modification to support for locale.js
        moment.lang(Tibbr.i18n.locale, Tibbr.i18n.defaults.date);

        // helper function for _date.from() and _date.fromNow()
        function substituteTimeAgo(string, number, withoutSuffix) {
            var rt = moment.relativeTime[string];
            return (typeof rt === 'function') ?
                rt(number || 1, !!withoutSuffix, string) :
                rt.replace(/%d/i, number || 1);
        }

        function relativeTime(milliseconds, withoutSuffix) {
            var seconds = round(Math.abs(milliseconds) / 1000),
                minutes = round(seconds / 60),
                hours = round(minutes / 60),
                days = round(hours / 24),
                years = round(days / 365),
                args = seconds < 45 && ['s', seconds] ||
                    minutes === 1 && ['m'] ||
                    minutes < 45 && ['mm', minutes] ||
                    hours === 1 && ['h'] ||
                    hours < 22 && ['hh', hours] ||
                    days === 1 && ['d'] ||
                    days <= 25 && ['dd', days] ||
                    days <= 45 && ['M'] ||
                    days < 345 && ['MM', round(days / 30)] ||
                    years === 1 && ['y'] || ['yy', years];
            args[2] = withoutSuffix;
            return substituteTimeAgo.apply({}, args);
        }

        // shortcut for prototype
        moment.fn = Moment.prototype = {

            clone:function () {
                return moment(this);
            },

            valueOf:function () {
                return +this._d;
            },

            'native':function () {
                return this._d;
            },

            toString:function () {
                return this._d.toString();
            },

            toDate:function () {
                return this._d;
            },

            format:function (inputString) {
                return formatDate(this._d, inputString);
            },

            add:function (input, val) {
                this._d = dateAddRemove(this._d, input, 1, val);
                return this;
            },

            subtract:function (input, val) {
                this._d = dateAddRemove(this._d, input, -1, val);
                return this;
            },

            diff:function (input, val, asFloat) {
                var inputMoment = moment(input),
                    diff = this._d - inputMoment._d,
                    year = this.year() - inputMoment.year(),
                    month = this.month() - inputMoment.month(),
                    day = this.day() - inputMoment.day(),
                    output;
                if (val === 'months') {
                    output = year * 12 + month + day / 30;
                } else if (val === 'years') {
                    output = year + month / 12;
                } else {
                    output = val === 'seconds' ? diff / 1e3 : // 1000
                        val === 'minutes' ? diff / 6e4 : // 1000 * 60
                            val === 'hours' ? diff / 36e5 : // 1000 * 60 * 60
                                val === 'days' ? diff / 864e5 : // 1000 * 60 * 60 * 24
                                    val === 'weeks' ? diff / 6048e5 : // 1000 * 60 * 60 * 24 * 7
                                        val === 'days' ? diff / 3600 : diff;
                }
                return asFloat ? output : round(output);
            },

            from:function (time, withoutSuffix) {
                var difference = this.diff(time),
                    rel = moment.relativeTime,
                    output = relativeTime(difference, withoutSuffix);
                return withoutSuffix ? output : (difference <= 0 ? rel.past : rel.future).replace(/%s/i, output);
            },

            fromNow:function (withoutSuffix) {
                return this.from(moment(), withoutSuffix);
            },

            isLeapYear:function () {
                var year = this.year();
                return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
            },

            isDST:function () {
                return this.zone() !== moment([this.year()]).zone();
            }
        };

        // helper for adding shortcuts
        function makeShortcut(name, key) {
            moment.fn[name] = function (input) {
                if (input != null) {
                    this._d['set' + key](input);
                    return this;
                } else {
                    return this._d['get' + key]();
                }
            };
        }

        // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds)
        for (i = 0; i < shortcuts.length; i++) {
            makeShortcut(shortcuts[i].toLowerCase(), shortcuts[i]);
        }

        // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
        makeShortcut('year', 'FullYear');

        // add shortcut for day (no setter)
        moment.fn.day = function () {
            return this._d.getDay();
        };

        // add shortcut for timezone offset (no setter)
        moment.fn.zone = function () {
            return this._d.getTimezoneOffset();
        };

        // CommonJS module is defined
        // tibbr: modify to support require.js
//        if (hasModule) {
//            module.exports = moment;
//        }
//        if (typeof window !== 'undefined') {
//            window.moment = moment;
//        }
        return  moment
    })(Date);


});
