define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/subject_follower_list.html'
    , 'views/subjects/users_list'
    , 'views/subjects/list_subject_follower'
    , 'views/subjects/find_subject_follower'
]
    , function ($, _, Tibbr, RightSideBar, UserList, ListSubjectFollower, FindSubjectFollower) {
        return Tibbr.RightSideBar1 = Tibbr.View.extend({
            qtipConfig:Tibbr.qtipConfigs.menu,
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render, this);
                this.collection.bind('reset', this.render);
            },
            events:{
                "click a#more":"SubjectFollower"  ,
                "click .edit-link":"open_follower_popup"
            },

            open_follower_popup:function(){
//
//                this.search_subject_follower();


                $("#edit-followers").parents('.menu-tip:first').show();
//                Tibbr.$("#ui-tooltip-0").show();
                return false;
            }   ,
            render:function () {
                $(this.el).html(this.template.render(RightSideBar, {model:this.model, collection:this.collection}));

                var $ele = this.$("#subject-followers");
                this.collection.each(function (user) {
                    $ele.append(new UserList({
                        model:user
                    }).render().el);
                });
                         this.search_subject_follower();
                return this;
            },
            search_subject_follower:function () {

                var popup = new FindSubjectFollower({
                    model:this.model,
                    params:this.params,
                    resultList:this.options.follower
//                    ,subscriptions:this.options.subscriptions
                });
                if (this.$("#edit-btn").find("div").length == 0) {
//                    this.add_subject_notification();
                    this.$("#edit-btn").append(popup.render().el);
                    $('.q-tip', $(this.el)).qtip(this.qtipConfig( this.$("#edit-btn")));

                }


            },

            SubjectFollower:function () {
                this.collection.fetch({data:{params:{set_actions: true}}});
                var $ele = $("#content");
                $ele.html("");
                $ele.append(new ListSubjectFollower({
                    collection:this.collection,
                    model:Tibbr.currentUser,
                    modelType:"User"
                }).render().el);
                return false;
            }
        });
    }); 

   