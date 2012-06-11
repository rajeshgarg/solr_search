define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/users/upload_photo.html'
    , 'modules/overlay'
]
    , function ($, _, Tibbr, upload_photo, Overlay) {
        return Tibbr.UploadPhotoView = Tibbr.View.extend({
            className:"profile-wrap",
            initialize:function () {
                _.bindAll(this, 'render','parseResponse');
            },
            render:function () {
                $(this.el).html(this.template.render(upload_photo, {model:this.model}));
                this.$('form').attr("action", Tibbr.serverUrl("users", null, this.model.id));
                this.$('iframe').on("load", this.parseResponse);
                return this;
            },

            parseResponse:function () {
//                var ret = frames['upload_frame_public'].document.getElementsByTagName("body")[0].innerHTML;
                var ret = this.$('iframe').contents().find("body").html();
                if (ret === '<pre> </pre>') {
                    window.location.reload();
                } else {
                    if (ret !== '') alert(ret);
                }
            }
        });
    });