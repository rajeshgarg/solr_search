define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/subjects/subject_recent_list_item'
    , 'text!templates/subjects/subject_recent_list.html'
]
    , function ($, _, Tibbr, SubjectRecentListItem, listTmpl) {
        return Tibbr.SubjectListItemView = Tibbr.View.extend({
            className:"",
            id:"subject-tab",
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var collection = this.collection;
                $(this.el).html(this.template.render(listTmpl, {hasMorePage: collection.hasMorePages}));
                var $ele = this.$(".recent-list");
                collection.each(function (subject) {
                    $ele.append(new SubjectRecentListItem({model:subject, collection:collection}).render().el);
                });
                return this;
            }
        });
    });