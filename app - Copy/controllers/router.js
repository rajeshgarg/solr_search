define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'controllers/application'
    , 'controllers/home'
    , 'controllers/users'
    , 'controllers/subjects'
    , 'controllers/test'
    , 'controllers/messages'
    , 'controllers/explore'
    , 'controllers/events'

],

    function ($, _, Backbone, Tibbr, Application, HomeController, UsersController, SubjectsController, TestController, MessageController, ExploreController, EventsController) {
        var setNavigation = function (name) {
            $("#global-nav > li").removeClass("active");
            $("#gn-" + name).addClass("active");
            $("#content").empty();
            if (name === "event_streams") {
                $("#content").attr("style", "width:100%")
            } else {
                $("#content").removeAttr("style")
            }
        };


        return Tibbr.Routes = Tibbr.Router.extend({
            initialize:function () {
                $('body').append($(Tibbr.UI.loader).hide())
            },
            index:function () {
                setNavigation("home");
                return new HomeController();
            },
            profile:function (id) {
                $("#main-sidebar, #sidebar").empty();
            },
            users:function () {
                setNavigation("profile");
                new UsersController(arguments)
            },
            subjects:function () {
                setNavigation("subjects");
                new SubjectsController(arguments);

            },
            test:function () {
                new TestController(arguments)
            },
            messages:function () {
                setNavigation("home");
                new MessageController(arguments)
            },
            explore:function () {
                setNavigation("people");
                $("#main-sidebar, #sidebar").empty();
                return new ExploreController(arguments)
            },

            events:function () {
                setNavigation("event_streams");
                $("#main-sidebar, #sidebar").empty();
                return new EventsController(arguments)
            }

        })
    });
