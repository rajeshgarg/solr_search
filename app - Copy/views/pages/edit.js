define(["jquery"
    , "underscore"
    , "tibbr"
    , 'text!templates/pages/edit.html'
    , 'models/page'
    , 'modules/wall_tab'
    , 'text!templates/common/wall_tab.html'
    ]
    , function ($, _, Tibbr, editPage, WallTab, wallTab) {
        return Tibbr.EditView = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render', 'parseResponse');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(editPage, {
                    model:this.model
                }));

                this.$('form').attr("action", Tibbr.serverUrl("pages", "update_with_languages", this.model.id));
                this.$('iframe').on("load", this.parseResponse);
                return this;
            },
            parseResponse:function () {
                var ret = this.$('iframe').contents().find("body").html();
                var data = {};
                try{
                    data = eval("(" + ret + ")");
                    if (data.id != undefined) {
                        $.colorbox.close();
                    }
                    else{
                        Tibbr.$("#page_message").addClass("error").html(data[0][1]);
                        $.colorbox.resize();
                    }
                }catch (e) {
                    $.colorbox.resize();
                    $(".edit-page-details").tabs();
                }
                return false;
            }

        });
    });