define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/announcements/announcement_item.html'
    , 'text!templates/announcements/post.html'
    , 'text!templates/announcements/image.html'
    , 'text!templates/announcements/poll.html'
    , 'text!templates/announcements/calendar.html'
    , 'text!templates/announcements/link.html'
    , 'text!templates/announcements/asset.html'
    , 'modules/dialog'
//  , 'text!templates/announcements/video.html'
]
    , function ($, _, Tibbr, announcementItem, postView, imageView, pollView, calendarView, linkView, assetView, Dialog) {
        return Tibbr.AnnouncementItemView = Tibbr.View.extend({
            tagName:"li",
            className:"go-to-message",
            events:{
                'click a.anouncement-delete':'destroy'
            },
            initialize:function () {
                _.bindAll(this, 'render', 'destroy');
                this.model.on('delete', this.remove, this);
            },
            render:function () {
                $(this.el).html(this.template.render(announcementItem, {model:this.model}));
                var type = this.model.type();
                var $ele = this.$('div.wrap');
                switch (type) {
                    case'poll':
                        var question_option = this.model.question.optionsAndVote();
                        $ele.append(this.template.render(pollView, {model:this.model, question_option:question_option[0], total_votes:question_option[1]}));
                        break;
                    case 'image':
                        $ele.append(this.template.render(imageView, {model:this.model, imageModel:this.model.assets.first()}));
                        break;
                    case 'calendar':
                        $ele.append(this.template.render(calendarView, {model:this.model}));
                        break;
                    case 'link':
                        $ele.append(this.template.render(linkView, {model:this.model, linkModel:this.model.links.first()}));
                        break;
                    case 'asset':
                        $ele.append(this.template.render(assetView, {model:this.model, assetModel:this.model.assets.first()}));
                        break;
                    default:
                        $ele.append(this.template.render(postView, {model:this.model}));
                }
                return this;
            },
            destroy:function (event) {
                var self = this;
                Dialog.remove({text:self.t("announcement.delete_alert"), okFunction:function () {
                    self.model.destroy($(event.target));
                }
                });
                return false;
            }
        });
    });