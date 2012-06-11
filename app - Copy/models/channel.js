define([
    'underscore'
    , 'tibbr'

]
    , function ( _, Tibbr) {
        return Tibbr.Channel = Tibbr.Model.extend({
            baseName:"channels",
            initialize:function () {
                _.bindAll(this);
            },
            pause: function(){
               Tibbr.currentUser.channelAction(this, "channel_pause");
            },
            play: function(){
               Tibbr.currentUser.channelAction(this, "channel_play");
            },
            activate: function(activation_code){
               Tibbr.currentUser.channelActivate(this, activation_code);
            },
            schedules: function(){
                Tibbr.currentUser.scheduleChannel(this)
            },
            createSchedule: function(subject_schedule){
                Tibbr.currentUser.createChannel(this, subject_schedule)
            }
        });
    });

