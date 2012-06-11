define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/explore/all_subjects.html'
]

, function ($, _, Tibbr, AllSubjectView) {
        return Tibbr.SearchResultView = Tibbr.View.extend({
            tagName:"tr",
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                 $(this.el).html(this.template.render(AllSubjectView, {model: this.model}));
                return this;
            }
        });
    });