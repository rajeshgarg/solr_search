
define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/subject_location.html'
]
    , function ($, _, Tibbr,SubjectLocation) {
        return Tibbr.SubjectLocationView = Tibbr.View.extend({
          
            initialize:function () {
                _.bindAll(this, 'render');
              this.model.bind('change',this.render,this);

            },
            render:function () {
                $(this.el).html(this.template.render(SubjectLocation,{model:this.model,margin:this.options.margin}));
                return this;
            }
        });
    });