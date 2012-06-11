define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/follow_button.html'
]
    , function ($, _, Tibbr, FollowBtnTmpl) {
        return Tibbr.FollowButtonView = Tibbr.View.extend({
            className:'button',
            events: {
                'click .js-action-button' : 'takeAction',
                'click a.follow-button-user': 'follow',
                'click a.unfollow-button-user': 'unfollow'


            },
            initialize:function (options) {
                _.bindAll(this, 'render');
                // this.model.bind('subject:subscribe', this.render, this);
                this.model.bind('change', this.render, this);

            },
            render:function () {
                 var action = _.find(this.model.actions(), function(action) {
                    if (action == "subscribe" || action == "unsubscribe" || action == "follow" || action == "unfollow")
                        return action
                }) || "owner";    // If subscribe or unsubscribe action is not found, "Owner" is set
                $(this.el).html(this.template.render(FollowBtnTmpl, {model: this.model, action: action}));
                return this;
            },
            follow: function() {
                Tibbr.currentUser.follow(this.model)
                return false;

            },
            unfollow:function() {

                Tibbr.currentUser.unfollow(this.model);
                return false;
            },

            takeAction: function(evt) {
                var $target = $(evt.currentTarget),
                    subjectId = $target.data('subject-id'),
                    // userId=$target.data('user-id'),
                    action = $target.data('action'),
                    model = this.model;
                $target.parent().append(spinner);
                Tibbr.currentUser.action(action, "update", {data:{params:{subject_id: subjectId}}, complete: function(res){
                    var replaceAction = "subscribe";
                    if (res.status === 200) {
                        if (action == replaceAction) replaceAction = "unsubscribe";
                        model.set({actions: model.get('actions').replace(action, replaceAction)});
                        model.trigger("subject:subscribe")
                    }
                }
                });

                return false;
            }
        });
    });