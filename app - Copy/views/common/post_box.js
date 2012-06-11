define([
    "jquery"
    , "underscore"
    , "tibbr"
    , "modules/dialog"
    , "text!templates/common/post_box.html"
    , "models/message"
    , "views/common/asset"
    , "views/messages/list_item"
    , "require/fcbk_complete"],
    function ($, _, Tibbr, Dialog, tmplPostBox, Message, AssetView, MessageItemView) {
        return Tibbr.PostBoxView = Tibbr.View.extend({
            className:"tib-post_tib-box",
            initialize:function (options) {
                _.bindAll(this, 'render', 'setSubjectName', 'parseResponse', 'reset', 'resetButton');
                this.options.parent.on("subject.name:change", this.setSubjectName, this);
            },
            render:function () {
                $(this.el).html(this.template.render(tmplPostBox, {user:Tibbr.user}));
                this.assetView = new AssetView();
                this.$(".asset-holder").html(this.assetView.render().el);
                return this;
            },
            setSubjectName:function (data) {
                var that = this;
                this.$(".bit-box").each(function () {
                    that.$(".subject_name").trigger('removeItem', [
                        {value:$(this).attr("rel")}
                    ]);
                });
                this.$(".subject_name").trigger("addItem", [
                    {"title":data.name.replace(/\./g, " "), "value":data.value}
                ]);
            },

//            bindt:function () {
//                var data = {items:[
//                    {value:"21", name:"Mick Jagger", image:'/assets/khakurel_net/images/users/profile_images/000/000/002_small.jpg'},
//                    {value:"43", name:"Johnny Storm", image:'/assets/khakurel_net/images/users/profile_images/000/000/001_small.jpg'},
//                    {value:"46", name:"Mick Jagger", image:'/assets/khakurel_net/images/users/profile_images/000/000/003_small.jpg'},
//                    {value:"54", name:"Mick Jagger", image:'/assets/khakurel_net/images/users/profile_images/000/000/004_small.jpg'},
//                    {value:"55", name:"Rudy Hamilton", image:'/assets/khakurel_net/images/users/profile_images/000/000/007_small.jpg'}
//                ]};
//                this.$(".subject_name").autoSuggest(data.items,
//                    {selectedItemProp:"name", searchObjProps:"name",
//                        formatList:function (data, elem) {
//                            console.log("tt");
//                            return elem.html('<img width="25" height="25" src="' + data.image + '"><span>' + data.name + '</span>');
//                        }});
//                this.$('form').attr("action", Tibbr.serverUrl("messages"));
//                this.$('iframe').on("load", this.parseResponse);
//
//            },
            bind:function () {
                this.$(".subject_name").fcbkcomplete({
                    json_url:Tibbr.serverUrl("users", "list_message_targets", Tibbr.user.id), filter_selected:true,
                    filter_hide:true, cache:false, complete_text:this.t("common.start_typing"),
                    maxitems:20, height:10, validateFunction:"validateSubjects"}).siblings()
                    .filter(".facebook-auto").css({"margin-left":"0px", "width":"auto"});
                if (this.options.targets) {

                } else {
                    this.setSubjectName({name:Tibbr.currentUser.get('display_name'), value:Tibbr.currentUser.get('login')})
                }
                $(this.el).hover(function () {
                    TEvent.insidePost = true;
                }, function () {
                    TEvent.insidePost = false;
                });

                this.$('form').attr("action", Tibbr.serverUrl("messages"));
                this.$('iframe').on("load", this.parseResponse);
            },
            parseResponse:function () {

//                var ret = frames['upload_frame_public'].document.getElementsByTagName("body")[0].innerHTML;
                var ret = this.$('iframe').contents().find("body").html();
                var data = {};
                try {
                    data = eval("(" + ret + ")");
                    if (data.id === undefined) {
                        Dialog.alert({text:_.flatten(data)[1] || "ERROR WHILE POSTING"});
                        this.resetButton();
                    }
                    else {
                        $("#my_posts").prepend(new MessageItemView({model:new Message(data)}).render().el);
                        this.reset();

                    }
                } catch (e) {
                }
                return false;
            },

            reset:function () {
                this.$('form :input').not(':button, :submit, :reset, :hidden, :checkbox').val('').end().removeAttr('checked').removeAttr('selected');
                this.$('form :input').removeAttr("disabled");
                this.$("div.asset-holder").html(this.assetView.render().el);
                this.$("input.question-options").attr("disabled", false);
                this.resetButton();

            },
            resetButton:function () {
                this.$(".line-loader").hide();
                $(window.currentPostTarget).show();
                window.currentPostTarget = undefined;
            }

        });
    });