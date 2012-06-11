define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/home/profile_section'
    , 'collections/default_filters'
    , 'collections/subscribed_filters'
    , 'collections/message_filters'
    , 'collections/idols'
    , 'collections/followers'
    , 'views/home/section'
    , 'views/users/user_box'
    , 'views/filters/manage'
    , 'modules/overlay'
]
    , function ($, _, Tibbr, ProfileSection, DefaultFilters, SubscribedFilters, MessageFilters, Idols, Followers, SectionView, UserBoxView, ManageMessagesView, Overlay) {
        return Tibbr.HomeLeftNav = Tibbr.View.extend({
            className:"padding-wrap",
            initialize:function (options) {
                _.bindAll(this, 'render', 'changeSection');
                this.event.bind("section:change", this.changeSection);
                this.homePage = options.homePage || false;

            },
            events:{
                "click a.followers":"showForm",
                "click a.manage":"showManage"
            },
            render:function () {

                // set Profile
                var profile = new ProfileSection({model:this.model}), $ele = $(this.el);
                $ele.html(profile.render().el);
                // set default filter
                if (this.homePage) {
                    var collection = new DefaultFilters(Tibbr.i18n.home.filters.defaults);
                    var defaultView = new SectionView({cssId:"default-filters", collection:collection});
                    $ele.append(defaultView.render().el)
                    // set event streams
                    var collectionSubscribed = new SubscribedFilters();
                    collectionSubscribed.scopeId = Tibbr.currentUser.id;
                    collectionSubscribed.getOrFetch();
                    Tibbr.serverStreams = collectionSubscribed;
                    var subscribedView = new SectionView({cssId:"event-filters", header:"My Streams", collection:collectionSubscribed});
                    $ele.append(subscribedView.render().el);
                    // set message filters
                    var collectionMessages = new MessageFilters();
                    collectionMessages.scopeId = Tibbr.currentUser.id;
                    collectionMessages.getOrFetch();
                    var messageFilterView = new SectionView({cssId:"event-filters", header:"My Filters", collection:collectionMessages});
                    $ele.append(messageFilterView.render().el);

                }
                return this;
            },
            changeSection:function (id, text) {
                this.$("ul.filters-items").find("li.active").removeClass("active");
                var filter = this.$("a#filter-" + id);
                filter.parent().addClass("active");
                text = text ||  filter.text();
                $("#active_wall").text(text);
                this.event.unbind("section:change", this.changeSection);
            },
            showForm:function () {
                var followers = new Followers();
                followers.scopeId = Tibbr.currentUser.id;
                var view = new UserBoxView({collection:followers});

//
//                followers.fetch({success:function(){
//                    Overlay.view(view.render().el);
//                }});

                Overlay.render({view:new UserBoxView({collection:followers}), fetch:followers});
                return false;
            },
            showManage:function () {
                var view = new ManageMessagesView({collection:new MessageFilters(this.dataSet.get("filters", Tibbr.currentUser.id).items), model:this.model});
                Overlay.view(view.render().el);
                Overlay.resize();
                return false;
            }

        });
    });