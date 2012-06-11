define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/subject_recent_list_item.html'
]
    , function ($, _, Tibbr, recent_list) {
        return Tibbr.SubjectRecentListItemView = Tibbr.View.extend({
            tagName:"tr",
            events:{},
            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                $(this.el).html(this.template.render(recent_list, {model:this.model}));
                return this;
            }
        });
    });