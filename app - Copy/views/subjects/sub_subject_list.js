define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/sub_subject_list.html'
]
    , function ($, _, Tibbr, SubSubject_list) {
        return Tibbr.SubjectPopularListItemView = Tibbr.View.extend({
            tagName:"li",
            events:{},
            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                $(this.el).html(this.template.render(SubSubject_list, {model:this.model, subsize:this.collection.size()}));
                return this;
            }
        });
    });