define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/messages/list_item'
    , 'views/common/see_more'
    , 'views/common/notice'
]
    , function ($, _, Tibbr, ListItemView, SeeMoreView, Notice) {
        return Tibbr.MessageListView = Tibbr.View.extend({
            id:"my_posts",
            className:"tibbit_list",
            tagName:"ol",
            initialize:function () {
                _.bindAll(this, 'render');
                if (_.isString(this.options.id)) this.id = this.options.id;
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var view, collection = this.collection, $ele = this.$el;
                collection.each(function (message) {
                    view = new ListItemView({
                        model:message,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                });
                if (collection.fetched) {
                    this.$(".more-tibs").remove();
                    this.$(".line-loader").remove();
                }
                if (this.collection.hasMorePages) {
                    this.seeMoreView = new SeeMoreView({collection:this.collection});
                    $ele.append(this.seeMoreView.el);
                }

                if (collection.fetched && collection.length == 0 && collection.current_page === 1) {
                    this.$el.append("MESSAGE NOT FOUND");
                }
                return this;

            }

        });
    });