define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/subjects/recent_list_item'
    , 'text!templates/subjects/recent_list.html'
]
    , function ($, _, Tibbr, RecentListItem, listTmpl) {
        return Tibbr.SubjectListItemView = Tibbr.View.extend({
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.on('reset', this.render);
            },
            render:function () {
                var collection = this.collection;
                if (collection.length > 0) {
                    this.$el.html(this.template.render(listTmpl, {header:this.options.header, hasMorePage:collection.hasMorePages})).addClass("flash");
                    var $ele = this.$("#recommendations");
                    collection.each(function (subject) {
                        $ele.append(new RecentListItem({model:subject, collection:collection}).render().el);
                    });
                }
                return this;
            }
        });
    });