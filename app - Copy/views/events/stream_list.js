define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/events/stream_item'
]
    , function ($, _, Tibbr, ListItem) {
        return  Tibbr.StreamListView = Tibbr.View.extend({
            tagName:"ul",
            className:"stream-list",
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var collection = this.collection, $ele = $(this.el), self=this;
                collection.each(function (stream) {
                    var view = new ListItem({
                        model:stream,
                        collection:collection,
                        type:self.options.type
                    });
                    $ele.append(view.render().el);
                });
                return this;
            }
        });
    });