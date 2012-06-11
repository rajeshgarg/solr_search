define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "text!templates/explore/user_item.html"
    , "text!templates/explore/subject_item.html"
    , 'views/users/user_tip'
    , 'views/common/follow_button'
], function ($, _, Tibbr, UserView, SubjectView, UserInfoTip, FollowButtonView) {

    return  Tibbr.MessageView = Tibbr.View.extend({
        tagName:"tr",
        initialize:function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render, this);
        },
        qtipConfig: Tibbr.qtipConfigs.popup,
        render:function () {
            switch (this.model.get("modelType")) {
                case "User":
                    $(this.el).html(this.template.render(UserView, {
                        user: this.model
                    }));
                    var followButtonView = new FollowButtonView({model: this.model});
                    this.$('.action-button').append(followButtonView.render().el);
                    this.renderPopup()
                    $('.user-tip', $(this.el)).qtip(this.qtipConfig($(this.el)));
                    break;
                case "Subject":
                    $(this.el).html(this.template.render(SubjectView, {subject: this.model}));
                    var followButtonView = new FollowButtonView({model: this.model});
                    this.$('.action-button').append(followButtonView.render().el);
                    break;
            }
            return this;
        },
//        renderUserList:function(){
//            $(this.el).html(this.template.render(UserView, {
//                        user: this.model
//                    }));
//                    var followButtonView = new FollowButtonView({model: this.model});
//                    this.$('.action-button').append(followButtonView.render().el);
//                    this.renderPopup()
//                    $('.user-tip', $(this.el)).qtip(this.qtipConfig($(this.el)));
//            return this;
//        },
        renderPopup:function() {
            var popup = new UserInfoTip({
                model:this.model,
                followBtn: false
            });
            $(this.el).append(popup.render().el);
        }

    });

});