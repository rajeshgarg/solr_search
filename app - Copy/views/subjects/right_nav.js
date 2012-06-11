define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/subjects/right_nav'
]
    , function ($, _, Tibbr, right_nav) {
        return Tibbr.SubjectRightNavView = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render');
            },
            render:function () {
                this.$el.html(this.template.render(right_nav))
                return this;

                //make call for followers
                var followerList;

                 this.$("follower-list").html(followerList)

            }

        });
    });