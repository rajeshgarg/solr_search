define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'require/fcbk_complete'
    , 'text!templates/messages/add.html'
]
    , function ($, _, Tibbr, $Fcbk, addTmpl) {

        return Tibbr.MessageAddView = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render', 'addToPost');
            },
            events:{
                "click input:submit":"addToPost"
            },
            render:function () {
                $(this.el).html(this.template.render(addTmpl));
                var html = $(this.options.html);
                html.find(".msg-datetime, .action-links, .comments, .all-comments").remove();
                this.$("ul.replies").addClass("hidden");

                this.$("div#msg_container").html(html);

                this.$("#subject_name").fcbkcomplete({
                    json_url:Tibbr.serverUrl("users", "list_users", Tibbr.currentUser.id) + "?params[exclude_subscriptions]=2&params[page]=1&params[per_page]=10&params[value_type]=login_name",
                    filter_selected:true,
                    filter_hide:true,
                    cache:false,
                    complete_text:"Start typing to select from list ...",
                    maxitems:20,
                    height:10,
                    validateFunction:"validationGroup",
                    onselect:null,
                    onremove:null}).siblings()
                    .filter(".facebook-auto").css({"margin-left":"0px", "width":"auto"});
                return this;
            },
            addToPost:function () {
                this.model.addSubjects(this.$("#subject_name").val().join(","));
                return false;
            }
        });
    });