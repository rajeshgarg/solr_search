define([
    "jquery"
    , "underscore"
    , "tibbr"
    , "views/common/rsvp_view"
    , "text!templates/common/calendar_element.html"
    , 'modules/overlay'
]
    , function ($, _, Tibbr,RSVPView, calendar,Overlay) {
        return Tibbr.CalenderElementView = Tibbr.View.extend({
            tagName:"div",
            className:"calendar-wrap",
            events:{
              "click .event-response":"showRSVP"
            },
            initialize:function () {
                _.bindAll(this, 'render','showRSVP');

            },
            render:function () {

                $(this.el).html(this.template.render(calendar, {model:this.model}));

                return this;
            },
            showRSVP:function(){
               Overlay.view(new RSVPView({model:this.model, parent:this}).render().el);

                return false;


            }



        })
    })