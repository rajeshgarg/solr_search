define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'collections/idols'
    , 'collections/my_subjects'
    , 'models/channel'
    , 'views/users/schedule_list_item'
    , 'text!templates/users/schedule_list.html'
]
    , function ($, _, Tibbr, Idols, MySubjects, Channel, ScheduleListItem, schedulelistTmpl) {
        return Tibbr.ScheduleListView = Tibbr.View.extend({
            events:{
                "click a.reset-btn":"cancel",
                "click button#apply-all":"applyAll",
                "click .save_schedule":"saveSchedule"

            },
            className:"edit-channel-alert",
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.model.on("schedule:reset", this.renderSchedule, this),
                this.model.bind("remove", this.remove, this)
            },
            render:function () {
                $(this.el).html(this.template.render(schedulelistTmpl, {model:this.model}).attr("style", "clear:both"));
                this.model.schedules();
                return this;
            },

            renderSchedule:function (data) {
                var users = new Idols(),
                    subjects = new MySubjects(), $list = this.$("ul.list-header");
                users.scopeId = Tibbr.currentUser.id;
                users.getOrFetch();
                subjects.scopeId = Tibbr.currentUser.id;
                subjects.fetch({data:{params:{include_self:true}}, success:function () {
                    users.each(
                        function (user) {
                            $list.append(new ScheduleListItem({model:user, schedule:data}).render().el);
                        }
                    );
                    subjects.each(
                        function (subject) {
                            $list.append(new ScheduleListItem({model:subject, schedule:data}).render().el);
                        }
                    );
                }});
            },
            cancel:function () {
                $(".edit-channel-alert").hide();
            },
            applyAll:function () {
                var optionCommon = $("#apply-all").prev().val();
                $("#apply-all").parents().children('.channel-delivery-settings').find('select').val(optionCommon);
                return false;
            },
            saveSchedule:function () {
                var schedules =  this.$(".delivery-option").map(function () {
                    return {"schedules": $(this).find(":selected").val(), "subject_id":$(this).data("id")}
                });
                this.model.createSchedule(schedules);
            }
        });
    });