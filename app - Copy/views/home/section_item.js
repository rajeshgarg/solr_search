define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/home/section_item.html'
]
    , function ($, _, Tibbr, section) {
        return Tibbr.SectionItem = Tibbr.View.extend({
            tagName:"li",
            initialize:function () {
                _.bindAll(this, 'render', 'setActive');
            },
            events:{
                "click a":"setActive"
            },
            render:function () {
                $(this.el).html(this.template.render(section, {model:this.model}));
                return this;
            },
            setActive:function (event) {
                var self = $(this.el);
                if (!self.hasClass("active")) {
                    $("ul.filters-items").find("li.active").removeClass("active");
                    self.addClass("active");
                    $("#my_posts").html(Tibbr.UI.loader);
                }
            }
        });
    });