define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/user'
    , 'text!templates/subjects/find_subject_follower.html'
    , "collections/users_search"
    , 'views/subjects/subject_follower_list'
]
    , function ($, _, Tibbr, User, SubjectFollower, UserSearch, ListItem) {
        return Tibbr.SubjectFollower = Tibbr.View.extend({
            className:' hidden qtip-content',

            observerHandle:null,
            events:{
                "keyup form#search_people input#search_str":"searchInputObserver",
                "click input:submit":"searchInputObserver",
                "click .remove-follower":"unfollowSubject",
                "click .follower-close":"close_follower_popup"
//                "click a#edit-btn":"open_follower_popup"
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.options.resultList.bind('reset', this.render);
                //  this.collection.bind('reset', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(SubjectFollower,{model:this.model}));
                var $ele = this.$("#followers_list"),is_owner=false,owner_ids= this.model.getSubjectOwner();

                var collectionw = this.options.resultList; //collection;
                collectionw.each(function (user) {
                    var view = new ListItem({
                        model:user,
                        is_owner:_.include(owner_ids, user.id)
                    });
                    $ele.append(view.render().el);

                });
                return this;
            },

//            open_follower_popup:function(){
////                Tibbr.$("#ui-tooltip-10").show();
//                return false;
//            },
//            getSubjectOwner:function(){
//                var is_owner = false,owner_ids=[], owners =this.model.get("owners") ;
//                if (_.isArray(owners)){
//                    _.each(owners, function (user) {
//                        owner_ids.push(user.id)
//                    });
//                }
//                return owner_ids;
//            },
            searchInputObserver: function(){
                if(this.observerHandle)

                    window.clearTimeout(this.observerHandle);
                var self = this;
                this.resetUI();
                var search_str = self.$("form#search_people input#search_str").val();
                var params = {
                    params:{
                        search_str:search_str,
                        subscriptions:this.model.id
                    }
                }
                this.options.resultList.tibbrURL = {controller:"users", action:"search_users"};
//                this.options.resultList.fetch({data:{params:{set_actions: true,page:(this.current_page || 0) + 1, per_page:10}}})

                this.options.resultList.setParams(params);
                this.observerHandle = setTimeout(function () {
                    self.$("span.search-status").first().html(Tibbr.UI.spinner);
                    self.options.resultList.fetch({
                        data:params
                    })
                }, 500);
                return false;
            },

            resetUI:function () {
                this.$("ul.filters-list li").removeClass("active");
                this.$("ul.filters-list li").has("img.spinner").find("img.spinner").remove();
                this.$("span.search-status").first().html("");
            },

            unfollowSubject:function(event){
                        var user_id = event.target.id;
                Tibbr.currentUser.action("unsubscribe", "update", {
 
                    data:{

                        params:{

                            user_id: user_id,
                            subject_id: this.model.id,
 
                            section:"private_subject",
                            type:"unsubscribe"
                        }
                    }
                });
 
                       this.searchInputObserver();
 
                return false;
            } ,
            close_follower_popup:function(){
//                console.log($("#ui-tooltip-10")) ;
//                console.log(this.$("#ui-tooltip-10")) ;
//                console.log(Tibbr.$("#ui-tooltip-10")) ;
//                $("#ui-tooltip-0").hide();
//                console.log($("#edit-followers").parents('.menu-tip:first'));
                $("#edit-followers").parents('.menu-tip:first').hide();
                return false;
            }
        });
    });