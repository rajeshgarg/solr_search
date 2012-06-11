define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/users/about.html'
]
    , function ($, _, Tibbr, profile) {
        return Tibbr.ProfileView = Tibbr.View.extend({
            className:"profile-wrap",
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(profile, {model:this.model}));
                return this;
            }
        });
    });