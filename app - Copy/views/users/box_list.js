define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/users/box_list_item'
    , "text!templates/people_block.html"],

    function ($, _, Tibbr, UserBoxListItem, peopleBlock) {
        return  Tibbr.UserBoxListView = Tibbr.View.extend({
            el:"#sidebar",
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                $(this.el).append(this.template.render(peopleBlock, {user:Tibbr.user, type:this.options.viewType  }));
            },
            render:function () {
                var collection = this.collection, $ele = this.$("#my-" + this.options.viewType);
                $ele.empty();
                collection.each(function (user) {
                    var view = new UserBoxListItem({
                        model:user,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                });
                $("span.my-" + this.options.viewType + "-count").html(collection.total_entries);
                return this;
            }
        });
    });