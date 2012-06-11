define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/user_channel.html'
    , 'models/channel'
    , 'models/user'
]
    , function ($, _, Tibbr, subjectNotification,Channel, User) {
        return Tibbr.SubjectNotificationView = Tibbr.View.extend({

            initialize:function () {
                _.bindAll(this, 'render');
            },
            events:{
                "click a.save" : "save",
                "click .edit" : "edit"
            },
            save:function(event){
                 var $link = $(event.target),target_id = $link.attr("id"),selected_time_period="none",params;
                this.$("select").attr("disabled", true);
                selected_time_period = this.$("select option:selected").val();
                params= {"" :{schedules: selected_time_period, subject_id:this.options.subject_id}};
                var channel = new Channel({id:this.model.id})
                channel.action("update_subject_channel_schedules","update",{data:{params:{subject_schedules:params }}})
                this.$(".edit").show();
                this.$(".save").hide();
                  return false;
            },
            edit:function(event){
                var $link = $(event.target),target_id = $link.attr("id");
                  this.$("select").attr("disabled", false);
                 this.$(".edit").hide();
                this.$(".save").show();
                return false;
            },
            render:function () {
                 $(this.el).html(this.template.render(subjectNotification,{model: this.model} ));
                this.$("#schedule_options_" + this.model.get('id')).val( this.options.schedules).attr('selected',true);
              return this;
            }
        });
    });