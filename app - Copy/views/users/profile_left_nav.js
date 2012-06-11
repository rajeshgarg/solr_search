define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/users/profile_left_nav.html'
    , 'views/users/upload_photo'
    , 'views/users/change_password'
    , 'modules/overlay'
]
    , function ($, _, Tibbr, profile, UploadPhotoView, ChangePasswordView, Overlay) {
        return Tibbr.ProfileView = Tibbr.View.extend({
            className:"profile-wrap",
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(profile, {model:this.model}));
                return this;
            },
            events:{
                "click a.upload-photo":"uploadPhoto",
                "click a.change-password":"changePassword"
            },
            uploadPhoto:function () {
                var view = new UploadPhotoView({model:this.model});
                Overlay.view(view.render().el);
                return false;
            },
            changePassword:function () {
                var view = new ChangePasswordView({model:this.model});
                Overlay.view(view.render().el);
                return false;
            }
        });
    });