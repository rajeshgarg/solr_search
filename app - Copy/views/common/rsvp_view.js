define([
    "jquery"
    , "underscore"
    , "tibbr"

    , "text!templates/common/rsvp_view.html"
]
    , function ($, _, Tibbr,rsvp) {
        return Tibbr.RSVPView = Tibbr.View.extend({

            events:{
           "click .ratio-event":"callRsvpEvent"
            },
            initialize:function () {
                _.bindAll(this, 'render','callRsvpEvent','callICal');


            },
            render:function () {
               $(this.el).html(this.template.render(rsvp, {model:this.model}));

                return this;
            },
            callRsvpEvent:function(event){

                var $ele = $(event.target).val();
                var _status = {may_be_attending: "May be attending", attending: "Attending", not_attending: "Not Attending"}
                this.model.callRsvp($ele);
                $('#event-response').colorbox.close();
                $("#calendar-response-message-"+this.model.get('id')).html("Your response is " + _status[$ele])

            },

            callICal:function(){
              //  console.log('inside')
                this.model.exportPath();
            }






        })
    })