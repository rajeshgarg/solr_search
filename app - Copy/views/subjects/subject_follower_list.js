define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "text!templates/subjects/user_item.html"
    , 'views/common/follow_button'
   
], function ($, _, Tibbr, UserView,FollowButtonView) {

    return  Tibbr.SubjectFollowerList = Tibbr.View.extend({
        tagName:"li",
        className:"ppl_following_list",
        initialize:function () {
            _.bindAll(this, 'render');

        },
        render:function () {

                      $(this.el).html(this.template.render(UserView, {user: this.model,is_owner:this.options.is_owner}));

            return this;
        }

    });

});