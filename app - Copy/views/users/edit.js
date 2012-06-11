define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/users/edit.html'
    , 'models/meta_detail'
]
    , function ($, _, Tibbr, edit, MetaDetail) {
        return Tibbr.EditView = Tibbr.View.extend({
            className:"profile-wrap",
            initialize:function () {
                _.bindAll(this, 'render', 'parseResponse');
                this.model.bind('change', this.render);
            },
            render:function () {
              $(this.el).html(this.template.render(edit, {model:this.model}));
                this.$('form').attr("action", Tibbr.serverUrl("users", null, this.model.id));
                this.$('iframe').on("load", this.parseResponse);
                return this;
            },

            parseResponse:function () {
                var ret = this.$('iframe').contents().find("body").html();
                if (ret === '<pre> </pre>') {
//                    Tibbr.app.navigate(Tibbr.url("users/about"), true);
                    window.location.href = Tibbr.url("users/about");
                    window.location.reload();
                }
//                return false;
            }

//            initMetaDetails function(){
//                var view = new MetaDetailView({model:meta_detail});
//                meta_detail.fetch(Tibbr.currentUser.metaDetailURL(), {success:function () {
//                    this.$("#edit-profile-details").html(view.render().el);
//                    this.$("#edit_profile").validate();
//                }})
//            }
        });
    });