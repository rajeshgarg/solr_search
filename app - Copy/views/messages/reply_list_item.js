define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/messages/link_item'
    , 'views/messages/asset_item'
    , 'text!templates/messages/reply.html'
    , 'views/messages/delete'
], function ($, _, Tibbr, LinkView, AssetView, reply, DeleteView) {

    return  Tibbr.MessageReplyView = Tibbr.View.extend({
        className:"reply",
        tagName:"li",
        initialize:function () {
            _.bindAll(this, 'render', 'like', 'renderLike', 'showGeoLoc');
            this.model.bind('like:change', this.renderLike, this);
        },
        events:{
            "click a.reply-like":"like",
            "click a.reply-delete":"delete",
            "click a.geo-loc-reply":"showGeoLoc"
        },
        render:function () {
            $(this.el).html(this.template.render(reply, {model:this.model}));
            if (this.model.links) {
                this.$(".attach-holder").append(new LinkView({model:this.model.links.first()}).render().el);
            }
            if (this.model.assets) {
                this.$(".attach-holder").append(new AssetView({model:this.model.assets.first()}).render().el);
            }
            this.renderLike();
            return this;
        },
        renderLike:function () {
            var likes = this.showLikes();
            this.$(".reply-like").html(likes.text).data("like", likes.liked);
            if (likes.html.length > 3) this.$(".like-replies").html(likes.html).show();
            else   this.$(".like-replies").html(likes.html).hide();
        },
        like:function (event) {
            this.model.like($(event.target).data("like"));
            return false;
        },
        'delete':function (event) {
            var $ele = this.$(".confirm-delete");
            $(this.el).children().hide();
            if ($ele.length == 0) {
                $(this.el).append(new DeleteView({model:this.model, replyList:this.collection}).render().el);
            }
            $ele.show();

            //var $parent = $(this.el).parents("ul.replies")[0];
            //console.log($parent);

            //if ($("li.reply",$parent).length == 0 && $("li.like",$parent).not(":hidden").length == 0)
            //    $parent.addClass("hidden");
            //else
            //   $parent.removeClass("hidden");

            //if (this.replies.length == 0 && this.model.like_to.length == 0) {
            //    this.$(".replies").addClass("hidden");
            //} else {
            //    this.$(".replies").removeClass("hidden");
            //}

            return false;
        },
        showLikes:function () {
            var you, users = this.model.like_to || [], html, buildList = function (users) {
                var html = '<ul class="user-menu-box" style="display:none">';
                html += users.map(function (user) {
                    return "<li><a href ='#'>" + user.get('display_name') + "</a></li>";
                });

                html += '</ul>';
                return html;
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

        showGeoLoc:function () {
            var $div = this.$(".geo-map-reply");
            if ($div.hasClass("loaded")) {

                $div.slideToggle("slow");
                return false;
            }
            else {
                var map_url = 'http://maps.google.com/maps?q=' + this.model.geo_location.latitude + '+' + this.model.geo_location.longitude + '&amp;&amp;markers=color:blue|size:mid|lable:S|' + this.model.geo_location.latitude + ',' + this.model.geo_location.longitude + '&amp;zoom=15&amp;output=embed" marginwidth="0" marginheight="0"';
                $div.append('<iframe width="425" scrolling="no" height="350" frameborder="0" src="' + map_url + '"></iframe><br><small><a style="color:#0000FF;text-align:left" target = "_blank" href="' + map_url + '">View Larger Map</a></small>').addClass("loaded");
                return false;
            }
        }



    });

});