define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/message_filter'
    , 'views/home/section_item'
    , 'text!templates/home/section.html'
]
    , function ($, _, Tibbr, MessageFilter, SectionItemView, section) {
        return Tibbr.HomeSection = Tibbr.View.extend({
            className:"section",
            initialize:function () {
                _.bindAll(this
                    , 'render', 'setActive');
                $(this.el).html(this.template.render(section, {model:MessageFilter, cssId:this.options.cssId, header:this.options.header || false}));
            },

            render:function () {
                var collection = this.collection, $ele = this.$(".filters-items");
                collection.each(function (section) {
                    var view = new SectionItemView({
                        model:section,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                });
                return this;
            },

            setActive:function () {
                if (this.options.cssId === "default-filters") {
                    var id = this.params().id;
                    if (id) {
                        this.$("a#filter-" + id).parent().addClass("active");
                    } else {
                        this.$("li").first().addClass("active");
                    }
                    $("#active_wall").text(this.$(".active").find("a").text());
                }
            }

        });
    });