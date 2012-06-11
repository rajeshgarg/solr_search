define(['i18n!nls/locale.js'], function (locale) {

    return  (function () {

        var interpolatePattern = /%\{([^}]+)\}/g;

        //Replace %{foo} with obj.foo
        function interpolate(str, obj) {
            return str.replace(interpolatePattern, function () {
                return typeof obj[arguments[1]] == 'undefined' ? arguments[0] : obj[arguments[1]];
            });
        };

        //Split "foo.bar" to ["foo", "bar"] if key is a string
        function keyToArray(key) {
            if (!key) return [];
            if (typeof key != "string") return key;
            return key.split('.');
        };

        I18n = {};
        I18n.translate = function (key, opts) {
            if (typeof key != "string") { //Bulk lookup
                var a = [], i;
                for (i = 0; i < key.length; i++) {
                    a.push(I18n.translate(key[i], opts));
                }
                return a;
            } else {
                opts = opts || {};
                opts.defaultValue = opts.defaultValue || null;
                key = keyToArray(opts.scope).concat(keyToArray(key));
                var value = I18n.lookup(key, opts.defaultValue);
                if (typeof value != "string" && value) value = I18n.pluralize(value, opts.count);
                if (typeof value == "string") value = interpolate(value, opts);
                return value;
            }
        };

        I18n.t = I18n.translate;

        //Looks up a translation using an array of strings where the last
        //is the key and any string before that define the scope. The current
        //locale is always prepended and does not need to be provided. The second
        //parameter is an array of strings used as defaults if the key can not be
        //found. If a key starts with ":" it is used as a key for lookup.
        //This method does not perform pluralization or interpolation.
        I18n.lookup = function (keys, defaults) {
            var i = 0, value = locale;
            defaults = typeof defaults == "string" ? [defaults] : (defaults || []);
            while (keys[i]) {
                value = value && value[keys[i]];
                i++;
            }
            if (value) {
                return value;
            } else {
                if (defaults.length == 0) {
                    return null;
                } else if (defaults[0].substr(0, 1) == ':') {
                    return I18n.lookup(keys.slice(0, keys.length - 1).concat(keyToArray(defaults[0].substr(1))), defaults.slice(1));
                } else {
                    return defaults[0];
                }
            }
        };

        I18n.pluralize = function (value, count) {
            if (typeof count != 'number') return value;
            return count == 1 ? value.one : value.other;
        };

        return I18n;

    })();

});