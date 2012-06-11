define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/common/user_tip.html'
    , 'views/common/follow_button'
    ]
    , function ($, _, Tibbr, userTipTmpl, FollowButton) {
        return Tibbr.userTip = Tibbr.View.extend({
            className:"ppl-popup-wrap qtip-content",
            initialize:function (options) {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(userTipTmpl,{
                    model: this.model
                }));
            
                if (this.options.followBtn){
                    var followButtonView = new FollowButton({
                        model: this.model
                    });
                    this.$('.info:eq(0)').append(followButtonView.render().el);
                }
                return this;
            }
        });
    });