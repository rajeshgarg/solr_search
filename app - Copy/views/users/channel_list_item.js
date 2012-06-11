define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/channel'
    , 'views/users/activate_channel'
    , 'views/users/schedule_list'
    , 'text!templates/users/channel_list_item.html'
]
    , function ($, _, Tibbr, Channel, activateChannel, scheduleChannel, channel_list) {
        return Tibbr.ChannelListItemView = Tibbr.View.extend({
            events:{
                "click a.delete_channel":"deleteChannel",
                "click a.schedule-channel":"pauseChannel",
                "click a.activate_channel":"activateChannel",
                "click a.edit_channel":"scheduleChannel"
            },
            initialize:function () {
                _.bindAll(this, 'render', 'activateChannel');
                this.model.bind("destroy", this.remove, this);
                this.model.bind('change',this.render, this );
                this.model.bind('channel_pause',this.pause, this );
                this.model.bind('channel_play',this.play, this );
                this.model.bind('show:activated',this.activateChannel, this );
            },

            render:function () {
                this.$el.html(this.template.render(channel_list, {model:this.model}));
                this.$el.addClass("channel_" + this.model.id);
                return this;
            },

            deleteChannel:function () {
                var answer = confirm("tibbr will delete the channel. Are you sure you want to proceed?");
                if (answer) {
                    this.model.destroy();
                }
            },

            pause: function(){
             this.model.set("paused", true)
            },

            play: function(){
                this.model.set("paused", false)
            },

            pauseChannel: function(){
                if (!this.model.get("paused")) {
                    this.model.pause();
                }
                else {
                    this.model.play();
                }
            },

            activateChannel: function(){
                $(".email_delivery").html("");
                var collection = this.collection, $ele = $("#delivery-info");
                $ele.after(new activateChannel({collection:collection, model:this.model}).render().el);
                return this;
            },

            scheduleChannel: function(){
                var collection = this.collection;
                this.$el.after(new scheduleChannel({model:this.model, collection:collection}).render().el);
                return this;
            }
        });
    });