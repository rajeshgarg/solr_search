define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/explore/all_people.html'
    , 'views/common/follow_button'
]

, function ($, _, Tibbr, AllPeopleView,FollowButtonView) {
        return Tibbr.SearchResultView = Tibbr.View.extend({
            tagName:"tr",
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                 $(this.el).html(this.template.render(AllPeopleView, {model: this.model}));
                 var followButtonView = new FollowButtonView({model: this.model});
                    this.$('.action-button').append(followButtonView.render().el);
                return this;
            }
        });
    });