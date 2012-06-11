define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/messages/reply_list_item'
]
    , function ($, _, Tibbr, ListItemView) {
        return Tibbr.MessageReplyListView = Tibbr.View.extend({
            className:"comment-list",
            tagName:"ul",
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var view, collection = this.collection, $ele = $(this.el);

                collection.each(function (reply) {
                    view = new ListItemView({
                        model:reply,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                });

                return this;

            }

        });
    });
