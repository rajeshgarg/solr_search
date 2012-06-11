define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/reply'
    , 'modules/dialog'
    , 'views/common/asset'
    , 'text!templates/messages/reply_box.html'
], function ($, _, Tibbr, Reply, Dialog, AssetView, replyBox) {

    return  Tibbr.MessageReplyBoxView = Tibbr.View.extend({
        errors:[],
        className: "reply-box-form",
        initialize:function () {
            _.bindAll(this, 'render', 'parseResponse', 'reset', 'postComment', 'validateForm', 'resetButton');
        },
        events:{
            "click input.post-btn":"postComment"
        },
        render:function () {
            $(this.el).html(this.template.render(replyBox, {model:this.model, currentUser: Tibbr.currentUser}));
            this.assetView = new AssetView();
            this.$(".asset-holder").html(this.assetView.render().el);
            this.$('iframe').on("load", this.parseResponse).attr("name", "iframe-" + this.cid);
            this.$('form').attr({"action":Tibbr.serverUrl("messages"), target:"iframe-" + this.cid});
            return this;

        },
        parseResponse:function () {
            var ret = this.$('iframe').contents().find("body").html();
            var data = {};
            try {
                data = eval("(" + ret + ")");
                if (data.id === undefined) {
                    Dialog.alert({text:_.flatten(data)[1] || "ERROR WHILE POSTING"});
                    this.resetButton();
                }
                else {
                    this.collection.add(new Reply(data),{silent:true});
                    this.collection.trigger("replyAdded",1);
                }
            } catch (e) {
            }
            return false;
        },
        postComment:function (event) {
            if (this.validateForm($(event.currentTarget))) {
                var message = this.$(".tib-text").val();
                this.$(".optional").each(function (val, item) {
                    if ($(item).val().length === 0) {
                        $(item).attr("disabled", "disabled");
                    }
                });
                this.$(".tib-text").val(message);
                window.currentPostTarget = event.currentTarget;
                $(event.currentTarget).hide().parent().append(Tibbr.UI.loader);
                this.$("form").submit();
            } else {
                Dialog.alert({text:this.errors.join("<br/>")});
                this.errors = [];
            }
            return false;
        },
        validateForm:function ($currentTarget) {
            var result = true;
            if (this.$(".tib-text").val().trim().length == 0) {
                result = false;
                this.errors.push(this.t("message.errors.can_not_blank"))
            }
            return result;
        },
        reset:function () {
            this.$(".tib-text").val("");
            this.assetView.clear();
            this.resetButton();

        },
        resetButton:function () {
            this.$(".line-loader").hide();
            $(window.currentPostTarget).show();
            window.currentPostTarget = undefined;
        }

    });

});