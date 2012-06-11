define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/user'
    , 'collections/users_search'
    , 'views/explore/my_people_list'
    , 'views/explore/my_people_list_item'
    , 'views/explore/my_people_search'
    , 'text!templates/explore/people_tab.html'
    , 'text!templates/explore/my_people_search.html'
    , 'text!templates/explore/my_people_holder.html'
]
    , function ($, _, Tibbr, User, UserSearch, ListView, ItemListView, PeopleSearchView, people_tab, peopleSearch, holder) {
        return Tibbr.ExploreLayout = Tibbr.View.extend({
            observerHandle:null,
            events:{
                "keyup input.search-input":"searchInputObserver"
            },
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.observerHandle = null;
                this.options.followers.bind("change",this.renderFollowers, this);
                this.options.idols.bind("change",this.renderFollowing, this);
            },
            render:function () {
               $(this.el).html(this.template.render(holder));
                this.renderFollowers();
                this.renderFollowing();
                return this;
            },
            renderFollowing: function(){
                this.followingView = new ListView({collection:this.options.idols, type:'following'});
                this.followingSearch = new PeopleSearchView({collection:this.options.idols, type:'following', count: Tibbr.currentUser.following().total_entries});
                this.$("#following").html(this.followingSearch.render().el).append(this.followingView.render().el);
            },
            renderFollowers: function(){
                this.followersView = new ListView({collection:this.options.followers, type:'followers'});
                this.followersSearch = new PeopleSearchView({collection:this.options.followers, type:'followers', count: Tibbr.currentUser.followers().total_entries});
                this.$("#followers").html(this.followersSearch.render().el).append(this.followersView.render().el);
            },
            searchInputObserver:function (event) {
                var ele = $(event.target), val = ele.val(), self = this;
               if(this.observerHandle)
                   window.clearTimeout(this.observerHandle);
                this.observerHandle =  setTimeout(function(){
                switch (ele.data("type")) {
                    case "followers":
                        self.options.followers.fetch({ data: {params:{following: Tibbr.currentUser.id, search_str: val, set_actions: true }}});
                        break;
                    default:
                        self.options.idols.fetch({ data: {params:{followers: Tibbr.currentUser.id, search_str: val, set_actions: true }}});
                }}, 500)
            }
        });
    });