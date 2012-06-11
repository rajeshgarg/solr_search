define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/post_poll_option.html'
    , 'require/moment'
]
    , function ($, _, Tibbr, pollOption, moment) {
        return Tibbr.PollOption = Tibbr.View.extend({
            tagName:'ul',
            className:'poll-box-wrap',
            collection:null,
            events:{
                "click input.question-options":"showNext"


            },
            initialize:function () {
                _.bindAll(this, 'render', "showNext");
                this.render();
            },
            options:Tibbr.i18n.common.post.poll_options,
            render:function () {

                var html = this.template.render(pollOption, {options:this.options, start_hours:Tibbr.i18n.common.post.calender.start_hour, start_minute:Tibbr.i18n.common.post.calender.start_minutes});
                this.bottomHtml = html.filter("div.add-question");
                $(this.el).html(html.not("div.add-question"));
                this.$("input").slice(3).hide();
                this.$("label").slice(3).hide();
                var date = parseInt(new Date().getHours())
                var minutes = parseInt(new Date().getMinutes())
                    var datelater=moment(new Date()).add('d',3).format("YYYY-MM-DD");

                this.bottomHtml.find('#poll_expiry_datepicker').val(datelater)

                if (date < 10)

                    date = "0" + date;

                this.bottomHtml.find('#poll_start_time_hour option[value=' + date + ']').attr("selected", true)
                 if (minutes >= 0 && minutes < 15)
                    this.bottomHtml.find('#poll_start_time_minute option[value=15]').attr("selected", true)
                else if (minutes >= 15 && minutes < 30)
                    this.bottomHtml.find('#poll_start_time_minute option[value=30]').attr("selected", true)
                else if (minutes >= 30 && minutes < 45)
                    this.bottomHtml.find('#poll_start_time_minute option[value=45]').attr("selected", true)

               else if  (minutes >= 45 && minutes < 60)
                    this.bottomHtml.find('#poll_start_time_minute option[value=00]').attr("selected", true)


                return this;
            },



            showNext:function (event) {
                $(event.target).next().show().next().show();
                return false;
            }

        });
    });