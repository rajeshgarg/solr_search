define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "modules/dialog"
    , 'views/common/post_box'
    , 'views/common/poll_option'
    , 'views/common/calender'
    , 'text!templates/common/status.html'
    , 'require/moment'
],
    function ($, _, Tibbr, Dialog, PostBoxView, PollOption, CalenderView, posting, moment) {
        return Tibbr.PostView = Tibbr.View.extend({
            className:"posting-tab-wrap",
            id:"posting-tab-wrap",
            events:{
                "click a":"showPost"
            },
            errors:[],
            initialize:function () {
                _.bindAll(this, 'render', 'showPost', "changeMessage", "post", "getTargets", "validateForm", "display");
            },
            render:function () {
                this.$el.html(this.template.render(posting, {}));
                this.$el.on("click", 'input.tib-btn', this.post);
                return this;
            },
            display:function () {
                this.$('a[data-type=post]').click();
            },
            showPost:function (event) {
                var $ele = $(event.currentTarget), box = "#tib-box", holder,
                    type = $ele.data("type"), view, tib_text = null;
                if (this.$(".tib-post_tib-box").length === 0) {
                    view = new PostBoxView({parent:this});
                    $(box).html(view.render().el);
                    view.bind();
                }
                this.$("div.holder, div.add-question, div.add-calendar, input.post-btn").hide();
                switch (type) {
                    case "poll":
                        holder = this.$('div.poll.options');
                        if (holder.find("ul.poll-options").length === 0) {
                            view = new PollOption();
                            holder.html(view.el).show();
                            this.$(".submit-holder").append(view.bottomHtml)
                            this.$("input.polldatepicker").click(function () {

                                $("input.polldatepicker").datepicker({minDate: new Date()}).datepicker("show")
                            })
                        } else {
                            holder.show();
                            this.$("div.add-question").show();
                        }
                        break;
                    case "calendar":
                        holder = this.$("div.calender")
                        if (holder.find("div.calendarinfo").length === 0) {
                            view = new CalenderView();
                            holder.html(view.el).show();
                            this.$(".submit-holder").append(view.bottomHtml)
                        }
                        else {
                            holder.show();
                            this.$("div.add-calendar").show();
                        }
                        tib_text = this.t('common.post.calender.what_are_you_planing');
                        break;
                    default:

                        this.$("input.post-btn").show();
                        break;
                }
                this.changeMessage(tib_text);
                this.$("input.post-type").val(type);
                $(box).show();
                return false;

            },
            changeMessage:function (val) {
                this.$(".tib-text").attr("placeholder", val || Tibbr.i18n.common.post.what_going_on);
            },
            post:function (event) {
                if (this.validateForm($(event.currentTarget))) {
                    var targets = this.getTargets(), message = this.$(".tib-text").val(), postType = this.$("input.post-type").val(), that = this;
                    this.$(".optional").each(function (val, item) {
                        if ($(item).val().length === 0) {
                            $(item).attr("disabled", "disabled");
                        }
                    });

                    switch (postType) {
                        case "calendar":
                            var start_date = this.$('.datepicker').val(),
                                start_time = this.$('#start_time_hour').val(),
                                start_min = this.$('#start_time_minute').val(),
                                final_date = start_date + " " + start_time + ":" + start_min,
                                durationHour = this.$('#duration_hour').val(),
                                durationMin = this.$('#duration_minute').val(),
                                durationCal = durationHour + ":" + durationMin;

                            this.$('.cal_start_date').val(final_date)
                            this.$('.cal_duration').val(durationCal);

                            break;
                        case "poll":
//                            this.$('#multi_select').val(this.$('#multi_select').is(':checked'))
                            var options = this.$(".question-options").each(function () {
                                if (_.isEmpty(that.$(this).val())) that.$(this).attr("disabled", true);
                            });

                            // var a = moment([2007, 0, 29]);
                            //  var b = moment([2007, 0, 28]);

                            // console.log(new Date(this.$('input.polldatepicker').val()))
                            var poll_start_date = this.$('.polldatepicker').val(),
                                poll_start_time = this.$('#poll_start_time_hour').val(),
                                poll_start_min = this.$('#poll_start_time_minute').val(),
                                poll_final_date = poll_start_date + " " + poll_start_time + ":" + poll_start_min
                            this.$('input.pollDate').val(poll_final_date)

                            break;

                    }

                    this.$(".tib-text").val(targets + " " + message);
                    window.currentPostTarget = event.currentTarget;
                    $(event.currentTarget).hide().parent().append(Tibbr.UI.loader);
                    this.$("form").submit();
                } else {
                    Dialog.alert({text:this.errors.join("<br/>")});
                    this.errors = [];
                }
                return false;
            },
            getTargets:function () {
                return $.makeArray(this.$(".subject_name option:selected").map(function (i, v) {
                    return "@" + v.value
                })).join(" ");
            },

            validateForm:function ($currentTarget) {
                var result = true;
                var today = moment(new Date())
                var pollDate = moment(new Date(this.$('input.polldatepicker').val()))
                var calendarDate = moment(new Date(this.$('input.datepicker').val()))
                var postType = this.$("input.post-type").val()

                if (this.$(".tib-text").val().trim().length == 0) {
                    result = false;
                    this.errors.push(this.t("message.errors.can_not_blank"))
                }
                switch (postType) {

                    case "calendar":
                       // console.log("in date")
                        if (_.isEmpty(this.$('input.datepicker').val())) {
                            result = false;
                            this.errors.push("Date cannot be empty")
                        }
                        if (calendarDate.diff(today, 'days') <= -2) {

                            result = false;
                            this.errors.push("Date cannot be less than today's date")
                        }
                        return result;
                        break;
                    case "poll":
                        if (_.isEmpty(this.$('input.polldatepicker').val())) {
                            result = false;
                            this.errors.push("Date cannot be empty")
                        }
                        if (pollDate.diff(today, 'days') <= -2) {

                            result = false;
                            this.errors.push("Poll expiry cannot be less than today's date")
                        }
                        return result;
                        break;

                }


                return result;
            }
        });
    });