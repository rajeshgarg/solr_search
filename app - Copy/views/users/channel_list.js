define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/channel'
    , 'views/users/new_channel'
    , 'views/users/channel_list_item'
    , 'text!templates/users/channel_list.html'
]
    , function ($, _, Tibbr, Channel, newChannel, ChannelListItem, listTmpl) {
        return Tibbr.ChannelListItemView = Tibbr.View.extend({
            id:"main-content",
            events:{
                "click a.new_or_activate":"newChannel",
                "click input#channel_submit":"enterChannel"
            },
            initialize:function (options) {
                _.bindAll(this, 'render', 'renderItem');
                this.collection.bind('reset', this.render);
                this.collection.bind('add', this.added, this);
                $(this.el).html(this.template.render(listTmpl));
            },
            render:function () {
                var collection = this.collection, self = this;
                collection.each(function (channel) {
                    self.renderItem(channel);
                });
                return this;
            },
            renderItem:function (channel) {
                this.$("#delivery-info h5").after(new ChannelListItem({model:channel, collection:this.collection}).render().el);
            },

            newChannel:function () {
                var collection = this.collection;
                var $ele = this.$("#delivery-info");
                $ele.after(new newChannel({collection:collection}).render().el);
                return this;
            },

            enterChannel:function () {
                var self = this, emailstr = $("#email-id").val(), channel = new Channel();
                channel.save({channel:{target:emailstr, name:emailstr}}, {success:function (model) {
                    self.collection.add(model);
                }});
            },
            added:function (model) {
                this.renderItem(model);
                $(this.el).find(".channel_" + model.id).find("p").effect("highlight", {}, 3000);
                var $ele = this.$(".email_delivery");
                $ele.hide();
                model.trigger("show:activated");
            }
        });
    });