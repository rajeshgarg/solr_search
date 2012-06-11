define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/edit_subject_title.html'
]
    , function ($, _, Tibbr, EditSubjectTitle) {
        return Tibbr.EditTitleView = Tibbr.View.extend({

            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                $(this.el).html(this.template.render(EditSubjectTitle, {model:this.model}));
                return this;
            }
   });
 });
