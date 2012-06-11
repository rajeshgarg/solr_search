define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/global_search.html'
]
    , function ($, _, Tibbr, GlobalSearchTmpl) {
        return Tibbr.PoupTip = Tibbr.View.extend({
            id: "global-search",
            events: {
                'keypress .g-search' : 'handleKeypress',
            },
            initialize:function (options) {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(GlobalSearchTmpl,{}));
                return this;
            },
            handleKeypress: function(event){
                var $textbox = $(event.currentTarget);
                if(event.keyCode == 13){
                    event.preventDefault();
                    console.log("search page will be shown");
                }
                else{
                    console.log($textbox.val().trim());
                }
            }
        });
    });