define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/common/follow_button'
    , 'text!templates/common/popup_tip.html'
]
    , function ($, _, Tibbr,FollowButtonView, popupTipTmpl) {
        return Tibbr.PoupTip = Tibbr.View.extend({
            className:'ppl-popup-wrap qtip-content directory-popup',
            initialize:function (options) {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(popupTipTmpl,{model: this.model}));
                var followButtonView = new FollowButtonView({model: this.model});
                this.$('.info:eq(0)').append(followButtonView.render().el);
                return this;
            }
        });
    });