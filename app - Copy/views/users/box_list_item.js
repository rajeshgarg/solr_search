define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/users/follower.html'
]
    , function ($, _, Tibbr, follower) {
        return Tibbr.UserBoxListItemView = Tibbr.View.extend({
            tagName:"li",
            events:{
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(follower, {self:this.model}));
                return this;
            }
        });
    });