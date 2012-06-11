define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'modules/wall_tab'
    , 'text!templates/common/wall_tab.html'
]
    , function ($, _, Tibbr, WallTab, wallTab) {
        return Tibbr.Wall_Tab = Tibbr.View.extend({
            className:'wall',
            id:"wall",
            render:function () {
                this.$el.html(this.template.render(wallTab));
                if (_.isString(this.options.name)) this.$el.find("#active_wall").text(this.options.name);
                $("#content").append(this.el);
                this.tab = WallTab.init("wall-tabs");
                return this;
            },
            setName:function (name) {
                this.$el.find("a#active_wall").text(name);
            },
            add:function (options) {
                WallTab.add(options);
            },
            addEvents:function (options) {
                WallTab.addEvents(options);
            }
        });
    });