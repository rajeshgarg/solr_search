define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/events/instance_item'
    , 'text!templates/events/instance_header.html'
]
    , function ($, _, Tibbr, ListItem, instanceHeader) {
        return  Tibbr.InstanceListView = Tibbr.View.extend({
            tagName:"ul",
            className:"feed-channel-list",
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                $(this.el).html(this.template.render(instanceHeader))
            },
            render:function () {
                var collection = this.collection, $ele = $(this.el), self = this;
                collection.each(function (instance) {
                    var view = new ListItem({
                        model:instance,
                        collection:collection,
                        definition:self.options.definition,
                        parent: self.options.parent
                    });
                    $ele.append(view.render().el);
                });
                return this;
            }
        });
    });