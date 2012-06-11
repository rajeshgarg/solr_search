define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'require/zclip'
    , 'text!templates/messages/copy_link.html'
]
    , function ($, _, Tibbr, zClip, copy_linkTmpl) {
        return Tibbr.MessageMuteView = Tibbr.View.extend({
            initialize:function (options) {
                _.bindAll(this, 'render');
            },
            events:{
            },
            render:function () {
                var self = this;
                $(this.options.target).zclip({
                    path:Tibbr.path('images/ZeroClipboard.swf'),
                    copy:function () {
                        return self.options.copyText;
                    },
                    afterCopy:function () {
                        //console.log(self)
                        //$(self.el).html(self.template.render(copy_linkTmpl, {copy_link:self.options.copyText}));
                    }
                });
                $(self.el).html(self.template.render(copy_linkTmpl, {copy_link:self.options.copyText}));
                return this;
            }
        });
    });