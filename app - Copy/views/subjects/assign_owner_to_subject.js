define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/subjects/assign_owner_to_subject.html'
    , 'models/role'
    , "require/fcbk_complete"
    ]
    , function ($, _, Tibbr, AssignOwner,Role) {
        return Tibbr.AssignOwnerToSubject = Tibbr.View.extend({
            defaults:{
                role_id:null
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render, this);
                this.options.role.bind('change',this.render,this);
                this.model.bind('role:change',this.roleChange,this)
            },
          
            events:{
                "click input:submit": "invite_submit",
                "click a#add_users":"add_user",
                "click a.remove_user": "remove_user"
            },
             invite_submit:function()
            {
                $.colorbox.close();
//                var emails =[];
//                var user_ids =[];
//                var suggest_message = $("#suggest_message").val();
//                Tibbr.$(".external-email").each(function(){emails.push(Tibbr.$(this).val())});
//                Tibbr.$(".bit-box").each(function(){user_ids.push(Tibbr.$(this)[0].getAttribute("rel"))});
//             //  Tibbr.currentUser.invitePeople([7],emails.join(","),suggest_message,this.model.id);
//                Tibbr.currentUser.invitePeople(user_ids,emails.join(","),suggest_message,this.model.id);
                return false;
            },
            add_user:function(event){

                var $link = $(event.target);
                $link.append(Tibbr.UI.spinner);
                var role_id = this.options.role.id;
                var user_ids = [];
                this.$(".bit-box").each(function(){
                    user_ids.push(Tibbr.$(this)[0].getAttribute("rel"))
                });
                var  role =new Role({
                    id:role_id
                });
                role.add_users(this.model, user_ids.join(","),"");
                this.model.fetch({
                    data: {
                        params:{
                            page:1,
                            per_page:10,
                            profile:"complete",
                            set_action:true
                        }
                    }, success: function(){$link.find("img.spinner").remove()}
                });
                return false;
            },

            remove_user:function(event){
                var $link = $(event.target);
                $link.append(Tibbr.UI.spinner);
                var role_id = this.options.role.id ; //37;
                var user_id = event.target.id ;
                var  role =new Role({
                    id:role_id
                });
                role.remove_users(this.model,user_id,"");
                return false;
            },
            roleChange:function()
            {
               this.model.fetch({
                    data: {
                        params:{
                            page:1,
                            per_page:10,
                            profile:"complete",
                            set_action:true
                        }
                    }
                });
            },
            render:function () {
                
                $(this.el).html(this.template.render(AssignOwner,{
                    model: this.model
                }));
                this.fcbkcomplete();
                return this;
            },
            fcbkcomplete:function () {

                this.$(".subject_name").fcbkcomplete({
                    json_url:Tibbr.serverUrl("users", "list_users", Tibbr.currentUser.id)+ "?params[value_type]=id",
                    filter_selected:true,
                    filter_hide:true,
                    cache:false,
                    complete_text:this.t("common.start_typing"),
                    maxitems:20,
                    height:10,
                    validateFunction:"validateSubjects"
                }).siblings()
                .filter(".facebook-auto").css({
                    "margin-left":"0px",
                    "width":"auto"
                });
            }
        });
    });



