define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/filters/filter_list_item.html'
]
    , function ($, _, Tibbr, filter_list) {
        return Tibbr.SectionItem = Tibbr.View.extend({
            tagName:"li",
            initialize:function () {
                _.bindAll(this, 'render');
            },
            events:{},
            render:function () {
                $(this.el).html(this.template.render(filter_list, {model:this.model}));
                return this;
            }
        });
    });