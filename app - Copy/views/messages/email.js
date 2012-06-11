define([
'jquery'
, 'underscore'
, 'tibbr'
, 'require/fcbk_complete'
, 'text!templates/messages/email.html'
]
, function ($, _, Tibbr, $Fcbk, emailTmpl) {
    return Tibbr.MessageEmailView = Tibbr.View.extend({
        className:"confirm-delete",
        initialize:function () {
            _.bindAll(this, 'render', 'yes');
        },
        events:{
            "click input:submit":"yes"
        },
        render:function () {
            $(this.el).html(this.template.render(emailTmpl));
            this.$("#login_names").fcbkcomplete({
                json_url: Tibbr.serverUrl("users", "list_users", Tibbr.currentUser.id) + "?params[exclude_subscriptions]=2&params[page]=1&params[per_page]=10&params[value_type]=id",
                filter_selected: true,
                filter_hide: true,
                cache:false,
                complete_text: "Start typing to select from list ...",
                maxitems: 20,
                height: 10,
                validateFunction: "validationGroup",
                onselect: null,
                onremove: null}).siblings()
                .filter(".facebook-auto").css({"margin-left":"0px", "width":"auto"});
            return this;
        },
        yes:function () {
            Tibbr.currentUser.shareMessage(this.model,this.$("#message_text").val(), this.$("#login_names").val().join(",") );
            return false;
        }
    });
});