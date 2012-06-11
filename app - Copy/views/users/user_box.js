define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/users/box_list_item'
],

    function ($, _, Tibbr, UserBoxListItem) {
        return  Tibbr.UserBoxListView = Tibbr.View.extend({
            tagName: "ul",
            className: "people-list",
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                var collection = this.collection, $ele = $(this.el);
                collection.each(function (user) {
                    var view = new UserBoxListItem({
                        model:user,
                        collection:collection
                    });
                    $ele.append(view.render().el);

                });
                return this;
            }
        });
    });