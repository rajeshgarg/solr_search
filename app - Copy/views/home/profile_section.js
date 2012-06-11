define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/home/profile_section.html']
    , function ($, _, Tibbr, profileSection) {
        return Tibbr.ProfileSection = Tibbr.View.extend({
            className:"profile-section",
            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                $(this.el).html(this.template.render(profileSection, {user: this.model}))
                return this;
            }

        });
    });