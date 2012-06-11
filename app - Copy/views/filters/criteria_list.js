define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/filters/criteria_list'
    , 'text!templates/filters/criteria_list.html'
]
    , function ($, _, Tibbr, CriteriaListView, criteria_list) {
        return Tibbr.CriteriaList = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render');
            },
            events:{},
            render:function () {
                $(this.el).html(this.template.render(criteria_list, {value:this.options.value}));
                return this;
            }
        });
    });