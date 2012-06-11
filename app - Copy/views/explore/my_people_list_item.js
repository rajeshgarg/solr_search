define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/explore/my_people_list_item.html'
    , 'views/common/follow_button'
]
    , function ($, _, Tibbr, my_people,FollowButtonView) {
        return Tibbr.MyPeopleListItemView = Tibbr.View.extend({
            tagName:"li",
            className: "ppl_following_list",
            events:{
            },
            initialize:function () {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(my_people, {model:this.model}));

                       var followButtonView = new FollowButtonView({model: this.model});

                    this.$('.action-button').append(followButtonView.render().el);
                return this;
            }
        });
    });