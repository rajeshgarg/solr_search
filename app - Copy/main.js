// Adds the toolbar and the mods scripts
if (!window.console) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
        "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i)
        window.console[names[i]] = function () {
        }
}

require.config({
    paths:{
        jquery:'lib/js/require/jquery',
        underscore:'lib/js/require/underscore',
        backbone:'lib/js/backbone/backbone',
        tmpl:'lib/js/require/tmpl',
        order:'lib/js/require/order',
        text:'lib/js/require/text',
        i18n:'lib/js/require/i18n',
        modules:'lib/js/tibbr',
        tibbr:'lib/js/tibbr/tibbr',
        routes:'routes',
        controllers:'controllers',
        collections:'collections',
        models:'models',
        views:'views',
        templates:'templates',
        require:"lib/js/require"

    },
    baseUrl:"/app",
    locale:window.locale || "en"
});

require([
    'jquery'
    , 'underscore'
    , 'require/qtip'
    , 'backbone'
    , 'tibbr'
    , 'models/user'
    , 'controllers/router'
], function ($, _, Qtip, Backbone, Tibbr, User, Routers) {

    _.each(window.AppSetting, function (setting) {
        Tibbr.data.set(setting);
    });

    var user = Tibbr.data.get("user", "current_user");
    if (user !== undefined) {
        Tibbr.currentUser = new User(Tibbr.data.get("user", "current_user"));
        Tibbr.user = Tibbr.currentUser;
        Tibbr.app = new Routers();
        Backbone.history.start({pushState:Tibbr.pushState()});
    } else {
        console.log("logged in please");
        return false;

    }

//    $("body").mouseup(function () {
//        if (!TEvent.insidePost) $('#tib-box').hide();
//    });
    console.log("started");
        $(document).bind("scroll",function () {
        var scrollHeight = $(document).height() - $(window).height() - $(document).scrollTop();
        if (scrollHeight >= 2 && scrollHeight < 200) {
          Tibbr.Event.trigger("scrolled_to_end");
        }
    });

});


requirejs.onError = function (err) {
    if (err.requireType === 'timeout') 
        console.error('Error: '+err.requireModules+' file is missing');
    else
        console.error(err.message);
    //throw err;
};