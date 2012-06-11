define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'controllers/application'
    , 'views/messages/list'
    , 'collections/all_messages'
    , 'text!templates/subjects/search_subject_messages.html'
    , "require/fcbk_complete"
]
    , function ($, _, Tibbr, Application,MessageListView,AllMessages ,SearchSubjectMessages ) {
        return Tibbr.SubjectListItemView = Tibbr.View.extend({
            events:{
                "click #search_datepicker":"showDatePicker"  ,
                "click #search_duration":"showDatePicker",
                "click .action-link": "get_subject_message",
                "click .close-search-enhancement":"on_close" ,
                "click .show-more-options":"show_more_option"
            },
            initialize:function (options) {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(SearchSubjectMessages, {model:this.model}));
                this.fcbkcomplete();
                this.showDatePicker();
                return this;
            }  ,

            get_subject_message:function(){
                var messages = new AllMessages(),
                    wall_title,
                    user_ids=[],
                    search_str = this.$("#search_str").val(),
                    messages_greater_than=this.$("#search_datepicker").val() ,
                    messages_less_than = this.$("#search_duration").val(),
                    msg_type = [] ,
                    t_msg_type=[],
                    mtypes =  "",
                    subject_ids = [this.model.id] ;

                this.$(".checkbox:checked").each(function(index) {
                    msg_type.push((this).value) ;
                    t_msg_type.push((this).value);
                });
                this.$(".bit-box").each(function () {
                    user_ids.push((this).getAttribute("rel"))
                });
                wall_title= "All Messages with "+ t_msg_type.join(" And ")+"["+ 0+ "]";

                  messages.scopeId = Tibbr.currentUser.id;
//                messages.fetch({data:{params:{set_actions:true, per_page:10, user_id:Tibbr.currentUser.id}} })
                  messages.subject_messages(search_str,messages_greater_than,messages_less_than,msg_type,mtypes,subject_ids,user_ids);
                var messageListView = new MessageListView({collection:messages}).render().el;
                Application.wallTabView.add({title: wall_title, content: messageListView, close: true});
//                UsersController#message_search to xml (for 127.0.0.1 at 2012-03-13 14:52:06) [GET]
//                Parameters: {"params"=>{"advanced_search_options"=>{"msg_type"=>"", "mtypes"=>"", "subject_ids"=>["47"], "user_ids"=>""}, "exclude_mtype"=>"", "greater_than_id"=>"", "include_replies"=>"true", "lat"=>"", "less_than_id"=>"", "like_by"=>"", "lng"=>"", "message_filter_id"=>"", "mtype"=>"", "page"=>"1", "per_page"=>"10", "range"=>"", "search_str"=>"subject1", "set_actions"=>"true", "subject_id"=>"", "user_id"=>""}, "controller"=>"users", "action"=>"message_search", "id"=>"3", "format"=>"xml"}
            }  ,
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
            } ,
//
            showDatePicker:function () {
                this.$(".datepicker").datepicker({
                    dateFormat:'yy-mm-dd',
                    beforeShow: function(input, inst) {
                        var maxdate= new Date()
                        $("#search_datepicker").datepicker("option", {
                            maxDate:maxdate
                        })
                        /* if ($("#search_datepicker").val() != "") {
                         $("#search_duration").datepicker("option", {
                         maxDate:maxdate

                         })
                         }
                         else
                         {
                         $("#search_duration").datepicker("option", {
                         minDate:maxdate+1,
                         maxDate:maxdate


                         })
                         }*/
                    },
                    onSelect:function (dateText, inst) {
                        if (inst.id == "search_datepicker") {
                            var dateArray = dateText.split("-");
                            var date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
                            var maxdate= new Date();
                            date.setDate(date.getDate() + 1);
                            $("#search_duration").datepicker("option", {
                                minDate:date,
                                maxDate:maxdate
                            })
                        }
                    }
                });
                return false;
            } ,

            show_more_option:function(){
                this.$('.search-options').show('slow');
                this.$('.show-more-options').hide();
                return false;
            } ,
            on_close:function(){


//                    $('.show-more-options').click(function(){
//
//                    });
//                });
//
//                $('.close-search-enhancement').live('click', function(){
                    var str= $("#search_str").val();
                    this.$('.show-more-options').show();
                    this.$('.search-options').hide();
                    $('#context_search')[0].reset();
                    $("#search_str")[0].value= str ;
                    $("#user_ids option:selected").remove();
                    $("#search_options").find("ul.holder li:not(:last-child)").remove();
                return false;
//                    });
//

            }
        });
    });