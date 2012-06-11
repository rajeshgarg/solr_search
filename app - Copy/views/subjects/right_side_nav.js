define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/user'
    , "collections/subscribers"
    , 'collections/subject_questions'
    , 'collections/subject_assets'
    , 'collections/subject_links'
    , "views/subjects/right_side_subject_follower"
    , 'views/subjects/subject_links'
    , 'views/subjects/subject_assets'
    , 'views/subjects/subject_questions'
    , 'views/subjects/right_list'
    , 'views/subjects/search_subject_messages'
    , 'text!templates/subjects/right_side_nav.html'

]
    , function ($, _, Tibbr, User, Subscribers, Questions, Assets, Links, RightSideSubjectFollower, LinkView, AssetView, QuestionView, RightList,SearchSubjctMeaasages, rightSideNav) {
        return Tibbr.RighrSideNav = Tibbr.View.extend({

            initialize:function () {
                _.bindAll(this, 'render');
            },

            render:function () {
                this.$el.html(this.template.render(rightSideNav));
                            this.searchSubjectMessages();
                this.followers();
                this.renderLinks();
                this.renderQuestions();
                this.renderAssets();
                return this;
            },
            renderLinks:function () {
                this.links = new Links();
                this.links.scopeId = Tibbr.currentUser.id;
                this.links.fetch({data:{params:{subject_id:this.model.id, set_actions:true, per_page:5, set_action:true}}})
                this.$('.links').html(new RightList({collection:this.links, itemView:LinkView, header:Tibbr.translate("subject.right_nav.links")}).render().el)
            },
            renderQuestions:function () {
                this.questions = new Questions();
                this.questions.scopeId = Tibbr.currentUser.id;
                this.questions.fetch({data:{params:{subject_id:this.model.id, set_actions:true, per_page:5, set_action:true}}});
                this.$('.questions').html(new RightList({collection:this.questions, itemView:QuestionView, header:Tibbr.translate("subject.right_nav.poll")}).render().el)
            },
            renderAssets:function () {
                this.assets = new Assets();
                this.assets.scopeId = Tibbr.currentUser.id;
                this.assets.fetch({data:{params:{subject_id:this.model.id, set_actions:true, per_page:5, set_action:true}}});
                this.$('.files').html(new RightList({collection:this.assets, itemView:AssetView, header:Tibbr.translate("subject.right_nav.assets")}).render().el)
            },
            followers:function () {
                var peopleList = new Subscribers(), subject = this.model, that = this;
                peopleList.scopeId = Tibbr.currentUser.id;
                peopleList.subject_id = subject.id;
                peopleList.fetch({
                    data:peopleList.data(),
                    success:function (collection, data) {
                        var follower = new Subscribers();
                        follower.scopeId = Tibbr.currentUser.id;
                        follower.subject_id = subject.id;
                        follower._set(data);
                        that.$(".followers").html(new RightSideSubjectFollower({model:subject, subscriptions:subject.id, collection:peopleList, follower:follower}).render().el);

                    }
                });
            },
            searchSubjectMessages:function(){
                this.$('.search-box').html(new SearchSubjctMeaasages({model:this.model}).render().el)

            }


        });
    });