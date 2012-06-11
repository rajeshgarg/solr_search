define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'controllers/application'
    , 'collections/messages'
    , "collections/global_announcement"
    , 'views/messages/list'
    , 'views/home/right_nav'
    , 'views/announcements/announcement_list'
],
    function ($, _, Backbone, Tibbr, Application,  Messages,GlobalAnnouncements, MessageListView,  RightNavView,AnnouncementListView) {
        return  Tibbr.Controller.extend({
            index:function () {
                $("#main-sidebar, #sidebar").empty();
                Application.setWallAndPost(Tibbr.currentUser, true);
                this.messageList(Tibbr.currentUser.id);
                this.globalAnnouncement();
                $("#sidebar").append(new RightNavView().render().el);
            },
            messageList:function (userId) {
                $("a#filter-my_wall").parent().addClass("active");
                $("#active_wall").text($("a#filter-my_wall").text());
                var messages = new Messages();
                messages.scopeId = userId;
                $("div.tibbit_div").html(new MessageListView({collection:messages}).render().el);
                messages.load();
            },
            globalAnnouncement:function(){
                console.log("in side");
                var global_collection = new GlobalAnnouncements();
                global_collection.scopeId = Tibbr.currentUser.id;
                global_collection.fetch({ data:{params:{page:1,per_page:999,set_actions:true}},
                     success:function () {
                        var announcementListView = new AnnouncementListView({collection:global_collection});
                        $('#posting-tab-wrap').after(announcementListView.render().el);
                     }
                });
            }
        })
    });
