define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "text!templates/subjects/right_block.html"
]
    , function ($, _, Tibbr, listTmpl) {
        return Tibbr.SubjectRightListView = Tibbr.View.extend({
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.on('reset', this.render);
                this.itemView = this.options.itemView;
            },
            render:function () {
                var that = this ,collection = this.collection;
                if (collection.length > 0) {
                    this.$el.html(this.template.render(listTmpl, {header:this.options.header, hasMorePage:collection.hasMorePages, count: collection.total_entries})).addClass("flash");
                    var $ele = this.$("ul");
                    collection.each(function (model) {
                        $ele.append(new  that.itemView({model:model, collection:collection}).render().el);
                    });
                }
                return this;
            }
        });
    });