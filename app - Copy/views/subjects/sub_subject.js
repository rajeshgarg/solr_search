define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/subjects/popular_list_item'
    , 'text!templates/subjects/sub_subject_list.html'
]
    , function ($, _, Tibbr, PopularListItem, listTmpl) {
        return Tibbr.SubjectListItemView = Tibbr.View.extend({
            className:"",
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var collection = this.collection;
                $(this.el).html(this.template.render(listTmpl, {header: this.options.header}));
                var $ele = this.$("#recommendations");
                collection.each(function (subject) {
                    $ele.append(new PopularListItem({model:subject, collection:collection}).render().el);
                });
            $("#sub_subjects").append(this.el);
                return this;
            }
        });
    });