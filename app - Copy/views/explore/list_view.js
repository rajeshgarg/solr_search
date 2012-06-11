define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/explore/list_item'
    , 'views/common/traditional_pagination'
    ],

    function ($, _, Tibbr, ListItem,TPagination) {
        return  Tibbr.UserBoxListView = Tibbr.View.extend({
            initialize: function(){
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                this.pagination = null;
            },
            render: function(){
                this.el = $("#list-view-div-list").first();
                var $ele = $("tbody#list-items", this.el),$paginateDiv = $("#pagination_list_view", this.el);
                $ele.empty();
                this.collection.each(function (user) {
                    var view = new ListItem({
                        model:user
                    });
                    $ele.append(view.render().el);
                });
                $paginateDiv.html("")
                this.pagination = this.pagination || new TPagination({
                    collection: this.collection, el:$paginateDiv
                    })
                this.pagination.render();
                return this;
            }
        });
    });