define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/channel'
    , 'text!templates/users/schedule_list_item.html'
]
    , function ($, _, Tibbr, Channel, schedule_list) {
        return Tibbr.ScheduleListItemView = Tibbr.View.extend({
            events:{
            },
            scheduleOptions:{realtime:"In Real-time", hour:"Hourly", day:"Daily", 0:"None"},
            tagName:"li",
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.schedule = this.options.schedule || {};

            },
            render:function () {
                $(this.el).html(this.template.render(schedule_list, {model:this.model, options:this.getScheduleOptions()}));
                return this;
            },
            getScheduleOptions:function () {
                //console.log(this.schedule, this.model)
                var self = this, subjectSchedules = this.schedule.subject_schedules || [], schedule = $.map(subjectSchedules, function (v) {
                    if (v.subject_id === self.model.id) return  v.schedules;

                })[0];
                schedule = schedule || '0';
                var lists = $.map(['realtime', 'hour', 'day', '0'], function (v, i) {
                    var selected = "";
                    if (schedule === v) selected = "selected='selected'";
                    return '<option value="' + v + '" ' + selected + '>' + self.scheduleOptions[v] + '</option>'
                });
                return lists.join(" ");
            }
        });
    });