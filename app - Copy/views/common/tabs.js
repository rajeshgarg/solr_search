define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/tabs.html'
]
    , function ($, _, Tibbr, TabsTmpl) {
        return Tibbr.TabView = Tibbr.View.extend({
            className:'tabs-wrapper',
            events: {
                'click .tabs-nav a' : 'navigate'
            },
            initialize:function (options) {
                _.bindAll(this, 'render','navigate');

            },
            render:function () {
                $(this.el).html(this.template.render(TabsTmpl,this.options.settings));
                this.$("#tab-content").append(Tibbr.UI.loader);
                return this;
            },
            navigate: function(evt){

                var path = $(evt.target).attr('href');
                $(evt.target).closest('ul').find('li').removeClass('active');
                $(evt.target).closest('li').addClass('active');
                Tibbr.app.navigate(path,true);
                return false;
            }
        });
    });