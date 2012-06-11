define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/pages/new.html'
    , 'models/page'
    , 'modules/wall_tab'
    , 'text!templates/common/wall_tab.html'
    ]
    , function ($, _, Tibbr, newPage, Page, WallTab, wallTab) {
        return Tibbr.NewView = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render', 'parseResponse');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(newPage, {
                    model:this.model
                }));
                this.$('form').attr("action", Tibbr.serverUrl("pages", "create_with_languages", 0));
                this.$('iframe').on("load", this.parseResponse);
                return this;
            },

            parseResponse:function () {
                var ret = this.$('iframe').contents().find("body").html();
                var data = {};
                try{
                    data = eval("(" + ret + ")");
                    if (data.id != undefined) {
                        WallTab.addWithIframe({title: data.name, src: data.url, height: 1300, close: false});
                        $.colorbox.close();
                    }
                    else{
                    $("#page_message").addClass("error").html(data[0][1]);
                    $.colorbox.resize();
                    }
                }catch (e) {
                }
                return false;
            }

        });
    });