define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'backbone'
    , 'models/reply'
    , 'collections/replies'
    , 'text!templates/messages/message.html'
    , 'views/messages/reply_list'
    , 'views/messages/link_item'
    , 'views/messages/asset_item'
    , 'views/messages/reply_box'
    , 'views/messages/delete'
    , 'views/messages/mute'
    , 'views/messages/copy_link'
    , 'views/messages/email'
    , 'views/common/menu_tip'
    , 'views/common/calendar_view'
    , 'modules/overlay'
    , 'views/messages/add'
    , 'views/common/question'
], function ($, _, Tibbr, Backbone, Reply, Replies, message, ReplyListView, MessageLinkView, MessageAssetView, ReplyBoxView, DeleteView, MuteView, CopyLinkView, EmailView, MenuTipView, CalendarView, Overlay, AddView, PollView) {

    return  Tibbr.MessageView = Tibbr.View.extend({
        className:"entry",
        tagName:"li",
        initialize:function () {
            _.bindAll(this, 'render', 'showReplyBox', 'toggleComment', 'renderReplies', 'like', "showLikes", 'renderLike', 'email', 'hideMenu', 'showGeo');
            this.model.bind('change', this.render, this);
            this.model.bind('like:change', this.renderLike, this);
            this.replies = new Replies((this.model.get('messages') || []).reverse());
            this.replies.bind("replyDeleted", this.updateReply, this)
            this.replies.bind("replyAdded", this.updateReply, this)
            this.model.bind("shareMessage:done", this.hideShareMessageBox, this);
            this.model.bind("addSubject:done", this.hideAddSubjectBox, this);
        },
        events:{
            "click a.reply-link":"showReplyBox",
            "click a.like-link":"like",
            "click a.toggle-comment":"toggleComment",
            "click a.star-status":"star",
            "mouseover":"showStar",
            "mouseout":"showStar",
            "click a.geo-location":"showGeo"
        },

        render:function () {

            $(this.el).html(this.template.render(message, {model:this.model, currentUser:Tibbr.currentUser}));
            if (this.model.getMessageType() === 'calendar' && this.model.calendar) {
                this.$('.m-holder').append(new CalendarView({model:this.model.calendar, parent:this}).render().el);
            }
            else if (this.model.getMessageType() === 'poll' && this.model.question) {
                this.$('.poll-wrap').append(new PollView({model:this.model.question, parent:this}).render().el);
            }
            if (this.model.links) {
                this.$(".attach-holder").append(new MessageLinkView({model:this.model.links.first()}).render().el);
            }
            if (this.model.assets) {
                this.$(".attach-holder").append(new MessageAssetView({model:this.model.assets.first()}).render().el);
            }
            this.renderReplies();
            this.renderLike();
            this.renderMenu();
            Overlay.imagePreview();
            return this;
        },
        updateReply:function (count) {
            this.model.set({"replies_count":this.model.get("replies_count") + count});
        },

        renderMenu:function () {
            var menu = new MenuTipView({model:this.model, parent:this});
            $(this.el).append(menu.render().el);
            this.$('.more-actions').qtip(Tibbr.qtipConfigs.menu($(this.el)));
        },
        hideMenu:function () {
            this.$('.more-actions').qtip('hide');
        },
        renderReplies:function () {
            if (this.comment) {
                this.replies = new Replies((this.model.get('messages') || []).reverse());
                this.comment = false;
            }
            if (this.replies.length > 0) {
                var replyView = new ReplyListView({collection:this.replies});
                if (this.replies.length === this.model.get("replies_count")) {
                    this.$(".toggle-comment").text(this.t('message.collapse_replies'));
                } else {
                    this.$(".toggle-comment").text(this.t('message.show_all_replies', this.model.numberOfReplies()));
                }
                this.$(".comments").html(replyView.render().el);
            }
        },
        renderLike:function () {
            var likes = this.showLikes();
            this.$(".like-link").html(likes.text).data("like", likes.liked);
            if (likes.html.length > 3) this.$(".like").html(likes.html).show();
            else   this.$(".like").html(likes.html).hide();
            if (this.replies.length == 0 && this.model.like_to.length == 0) {
                this.$(".replies").addClass("hidden");
            } else {
                this.$(".replies").removeClass("hidden");
            }

        },
        confirmDelete:function () {
            var $ele = this.$(".confirm-delete");
            $(this.el).children().hide();
            if ($ele.length == 0) {
                $(this.el).append(new DeleteView({model:this.model, replyList:this.replies || null}).render().el);
            }
            $ele.show();
            this.hideMenu();
            return false;
        },
        confirmMute:function () {
            var $ele = this.$(".confirm-mute");
            $(this.el).children().hide();
            if ($ele.length == 0) {
                $(this.el).append(new MuteView({model:this.model}).render().el);
            }
            $ele.show();
            this.hideMenu();
            return false;
        },
        unMute:function (event) {
            this.model.unmute();
            this.hideMenu();
            return false;
        },
        copyLink:function () {
            this.hideMenu();
            var tempURL;
            tempURL = "URL: " + Tibbr.host() + this.model._url("messages/" + this.model.get("id"));
            Overlay.view(new CopyLinkView({copyText:tempURL}).render().el);
            //add copy to clipboard here
            //$('#copy_link').zclip({
            //    path:'ZeroClipboard.swf',
            //    copy: tempURL
            //});
            return false;
        },
        add:function () {
            Overlay.view(new AddView({html:$(this.el).html(), model:this.model}).render().el);
            this.hideMenu();
            return false;
        },
        hideShareMessageBox:function () {
            Overlay.close();
        },
        hideAddSubjectBox:function () {
            this.model.fetch({success:function (model, data) {
                model.subjects.reset(data.subjects);
                model.trigger("change");
            }});
            Overlay.close();
        },
        showReplyBox:function () {
            var $ele = this.$(".reply-box"), form = $ele.find("form");
            if (form.length == 0) {
                $ele.html(new ReplyBoxView({model:this.model, collection:this.replies}).render().el);
            }

            if ($ele.is(":visible")) {
                if (this.replies.length == 0 && this.model.like_to.length == 0) this.$(".replies").addClass("hidden");
                $ele.slideUp("slow");
            } else {
                this.$(".replies").slideDown("slow");
                $ele.slideDown("slow");
            }

            return false;
        },
        email:function () {
            Overlay.view(new EmailView({model:this.model}).render().el);
            this.hideMenu();
            return false;
        },
        showStar:function (event) {
            if (event.type === "mouseover") this.$(".star-status").addClass("favorite-icon");
            else this.$(".star-status").removeClass("favorite-icon");
        },
        star:function (event) {
            var $el = $(event.target).parent();
            if ($el.hasClass("starred")) {
                this.model.action("unstar", "update");
                $el.removeClass("starred");
            } else {
                this.model.action("star", "update");
                $el.addClass("starred");
            }

        },

        toggleComment:function (event) {
            var $ele = $(event.target), total = $ele.data("count"),
                isOpen = this.$("li.reply:visible").length >= total, self = this;
            if (isOpen) {
                $(this.$("li.reply").get()).slice(2).hide();
                $ele.text(this.t('message.show_all_replies', this.model.numberOfReplies()))
            } else {
                if (total !== this.replies.length) {
                    self.comment = true;
                    this.model.fetch({beforeSend:function () {
                        self.$(".toggle-comment").html(Tibbr.UI.loader);
                    }});

                } else {
                    $ele.text(Tibbr.translate('message.collapse_replies'));
                    this.$("li.reply").show();
                }
            }
            return false;
        },
        like:function (event) {
            this.model.like($(event.target).data("like"));
            return false;
        },
        showLikes:function () {
            var you, users = this.model.like_to || [], html, buildList = function (users) {
                var _html = '<ul class="user-menu-box" style="display:none">';
                _html += users.map(function (user) {
                    return "<li><a href ='#'>" + user.get('display_name') + "</a></li>";
                });

                _html += '</ul>';
                return _html;
            };
            if (users.length === 0) return  { text:this.t("message.like_to.like"), html:"", liked:false};

            you = users.detect(function (user) {
                return user.id === Tibbr.currentUser.id
            });
            var isYou = you !== undefined;
            if (you) {
                users = users.reject(function (user) {
                    return user.id === Tibbr.currentUser.id
                })
            }

            switch (isYou) {
                case true:
                    switch (users.length) {
                        case 0:
                            html = this.t("message.like_to.you");
                            break;
                        case 1:
                            html = this.t("message.like_to.you_and_one", users[0].showUrl(), users[0].get("display_name"));
                            break;

                        default:
                            html = this.t("message.like_to.you_and_more", users[0].showUrl(), users[0].get("display_name"), (users.length - 1));
                            html += buildList(users.slice(1));
                            break;
                    }
                    break;
                default:
                    switch (users.length) {
                        case 1:
                            html = this.t("message.like_to.one", users.first().showUrl(), users.first().get("display_name"));
                            break;
                        case 2:
                            html = this.t("message.like_to.two", users.first().showUrl(), users.first().get("display_name"), users[1].showUrl(), users[1].get("display_name"));
                            break;
                        default:
                            html = this.t("message.like_to.more", users.first().showUrl(), users.first().get("display_name"), users[1].showUrl(), users[1].get("display_name"), (users.length - 2));
                            html += buildList(users.slice(2));
                            break;
                    }
                    break;
            }

            return { text:this.t("message.like_to." + (isYou ? "unlike" : "like")), html:html, liked:you !== undefined}
        },

        showGeo:function () {

            var $div = this.$(".geo-map");
            if ($div.hasClass("loaded")) {
                $div.slideToggle("slow");
                return false;
            }
            else {

                var map_url = '//maps.google.com/maps?q=' + this.model.geo_location.get('latitude') + '+' + this.model.geo_location.get('longitude') + '&amp;&amp;markers=color:blue|size:mid|lable:S|' + this.model.geo_location.get('latitude') + ',' + this.model.geo_location.get('longitude') + '&amp;zoom=15&amp;output=embed" marginwidth="0" marginheight="0"';
                $div.append('<iframe width="425" scrolling="no" height="350" frameborder="0" src="' + map_url + '"></iframe><br><small><a style="color:#0000FF;text-align:left" target = "_blank" href="' + map_url + '">View Larger Map</a></small>').addClass("loaded");
                return false;
            }
        }


    });

});