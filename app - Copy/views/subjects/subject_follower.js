define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/subject_follower.html'

]
    , function ($, _, Tibbr,  SubjectFollower) {
        return Tibbr.SubjectLeftNav = Tibbr.View.extend({
            className:"follower_stat",

            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            render:function () {

                $(this.el).html(this.template.render(SubjectFollower, {model:this.model }));
                return this;
            }
        });
    });