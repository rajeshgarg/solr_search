define([
    "jquery"
    , "underscore"
    , "tibbr"

    , "text!templates/common/calender.html"
]
    , function ($, _, Tibbr, calender) {
        return Tibbr.CalenderView = Tibbr.View.extend({
            className:"calendarinfo",
            events:{
                "click input.datepicker":"showDatePicker"
            },
            initialize:function () {

                _.bindAll(this, 'render', 'showDatePicker');

                this.render();

            },
            render:function () {

                var html = this.template.render(calender, {start_hours:Tibbr.i18n.common.post.calender.start_hour, start_minute:Tibbr.i18n.common.post.calender.start_minutes,
                    duration_hour:Tibbr.i18n.common.post.calender.duration_hours, duration_minute:Tibbr.i18n.common.post.calender.duration_minutes});

                this.bottomHtml = html.filter("div.add-calendar");
                $(this.el).html(html.not("div.add-calendar"));
                var date = parseInt(new Date().getHours())
                if (date < 10)

                    date = "0" + date;

                this.$('#start_time_hour option[value=' + date + ']').attr("selected", true)

                return this;
            },

            showDatePicker:function () {
              //  console.log("in date")
               this.$(".datepicker").datepicker({minDate: new Date()}).datepicker("show");
                return false;
            }

        });
    });