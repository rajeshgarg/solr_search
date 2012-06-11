define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/invite_people.html'
    , "require/fcbk_complete"
]
    , function ($, _, Tibbr, InvitePeople) {
        return Tibbr.InvitePeopleView = Tibbr.View.extend({

            initialize:function () {
                _.bindAll(this, 'render');

            },
            events:{
                "click input:submit":"invite_submit",
                "click a#add_more_email":"add_email"
            },
            add_email:function () {
                this.$("#add_more_email").before('<li> <input type="text" class=" email  text external-email" id="email_3" name="emails[]" size="30"></li>')
                $.colorbox.resize();
                return false;
//                Tibbr.$("#cboxLoadedContent").height = "555 px";
 
            },
            invite_submit:function () {
                var emails = [];
                var user_ids = [];
                var suggest_message = Tibbr.$("#suggest_message").val();
                this.$(".external-email").each(function () {
                    emails.push((this).val())
                });
                this.$(".bit-box").each(function () {
                    user_ids.push((this).getAttribute("rel"))
                });
                //  Tibbr.currentUser.invitePeople([7],emails.join(","),suggest_message,this.model.id);
                Tibbr.currentUser.invitePeople(user_ids, emails.join(","), suggest_message, this.model.id);
                return false;
            },
            render:function () {
                $(this.el).html(this.template.render(InvitePeople, {model:this.model}));
                //this.$('form').attr("action", Tibbr.serverUrl("users","recommend_a_subject",Tibbr.currentUser.id));


                this.bind();
                return this;
            },
            bind:function () {
                this.$(".subject_name").fcbkcomplete({
                    json_url:Tibbr.serverUrl("users", "list_message_targets", Tibbr.currentUser.id) + "?params[value_type]=id", filter_selected:true,
                    filter_hide:true, cache:false, complete_text:this.t("common.start_typing"),
                    maxitems:20, height:10, validateFunction:"validateSubjects"}).siblings()
                    .filter(".facebook-auto").css({"margin-left":"0px", "width":"auto"});
            }
        });
    });



