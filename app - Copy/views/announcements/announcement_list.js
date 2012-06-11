define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/announcements/announcement_list.html'
    , 'views/announcements/announcement_item'
    , 'require/jcarousel'
    ]
    , function ($, _, Tibbr,announcementList,announcementItemView) {
        return Tibbr.AnnouncementListView = Tibbr.View.extend({
            tagName:"div",
            id:"global-announcement-wrap",
            events:{
                'click div..announcement-head' :'toggleAnnouncement'
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                if (this.collection.size() > 0) {
                    $(this.el).html(this.template.render(announcementList, {
                        model:this.model
                    }));

                    var collection = this.collection, $ele = this.$('#announcement-items-carousel');
                    collection.each(function (announcement) {
                        var view = new announcementItemView({
                            model: announcement,
                            id:"announcement-"+announcement.get('id')
                        });
                        $ele.append(view.render().el);
                    });
                    this.applyCarousel();
                }
                return this;
            },
            applyCarousel:function(){
                var totalAnnouncements = this.$('ul#announcement-items-carousel >li').length;
                this.$('ul#announcement-items-carousel').jcarousel({
                    scroll:3,
                    start:1,
                    offset:1,
                    visible:totalAnnouncements < 4 ? totalAnnouncements : 3,
                    buttonNextHTML: totalAnnouncements < 4 ? "" : "<div></div>",
                    buttonPrevHTML: totalAnnouncements < 4 ? "" : "<div></div>",
                    initCallback:this.mycarousel_initCallback(),
                    itemFallbackDimension:230,
                    setupCallback:function (crs) {
                        crs.scroll(1)
                    }
                });
                // show/hide next-prev arrow on hover
                this.$('#global-announcement-wrap .jcarousel-container').hover(function () {
                    $('.jcarousel-prev-horizontal').css('visibility', 'visible');
                    $('.jcarousel-next-horizontal').css('visibility', 'visible');
                }, function () {
                    $('.jcarousel-prev-horizontal').css('visibility', 'hidden');
                    $('.jcarousel-next-horizontal').css('visibility', 'hidden');
                });
                // apply/remove focused class on hover
                this.$('#global-announcement-wrap .jcarousel-item').hover(function (event) {
                    $(event.target).addClass('focused');
                }, function (event) {
                    $(event.target).removeClass('focused');
                });
            },
            mycarousel_initCallback:function(){
                var maxHeight = 80;
                this.$('#announcement-items-carousel >li .wrap')
                .each(function () {
                    maxHeight = Math.max(maxHeight, $(this).outerHeight());
                })
                .height(maxHeight + 5);
            },
            toggleAnnouncement:function(){
                var $self = this.$('.announcement-head');
                var open = $self.hasClass("open");
                var container = $self.parents('#announcement-wrap').find('ul#announcement-items-carousel');
                if (open) {
                    container.hide();
                    $self.removeClass("open");
                }
                else {
                    container.show();
                    $self.addClass("open")
                }
            }

        });
    });