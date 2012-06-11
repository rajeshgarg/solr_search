define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/popular_list_item.html'
]
    , function ($, _, Tibbr, popular_list) {
        return Tibbr.SubjectPopularListItemView = Tibbr.View.extend({
            tagName:"li",
            events:{},
            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                $(this.el).html(this.template.render(popular_list, {model:this.model}));
                return this;
            }
        });
    });