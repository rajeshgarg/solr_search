define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "collections/pages"
    , 'text!templates/pages/manage_page_link.html'
    , "views/pages/manage_pages"
    , 'modules/overlay'
    ]
    , function ($, _, Tibbr, Pages, managePageLink, ManagePages, Overlay) {
        return Tibbr.ManagePageLink = Tibbr.View.extend({
            className:"",
            events:{
                "click a#managePages":"manage_pages"
            },
            initialize:function () {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(managePageLink));
                return this;
            },
            manage_pages:function(){
                var pages = new Pages();
                pages.scopeId= this.model.id;
                pages.load(this.model.id);
                var view = new ManagePages({
                    collection: pages,
                    model: this.model
                });
                Overlay.view(view.render().el);
                return false;
            }
        });
    });