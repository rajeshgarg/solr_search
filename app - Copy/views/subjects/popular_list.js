define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/subjects/popular_list_item'
    , 'text!templates/subjects/recent_list.html'
]
    , function ($, _, Tibbr, PopularListItem, listTmpl) {
        return Tibbr.SubjectListItemView = Tibbr.View.extend({
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var collection = this.collection;
                if (collection.length > 0) {
                    $(this.el).html(this.template.render(listTmpl, {header:this.options.header})).addClass("flash");
                    var $ele = this.$("#recommendations");
                    collection.each(function (subject) {
                        var el = new PopularListItem({model:subject, collection:collection}).render().el;
                        $ele.append($(el).addClass("subject-cloud"));
                    });
                }
                return this;
            }
        });
    });