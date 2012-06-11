define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/users/change_password.html'
]
    , function ($, _, Tibbr, change_password) {
        return Tibbr.ChangePasswordView = Tibbr.View.extend({
            className:"profile-wrap",
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(change_password, {model:this.model}));
                return this;
            },
            events: {
                "click input:submit":"changePassword"
            },
            changePassword:function() {
                Tibbr.currentUser.changePassword(this.$('#old_password').val(),this.$('#password').val(),this.$('#password_confirmation').val(),this.model.id);
                return false;
            }
        });
    });