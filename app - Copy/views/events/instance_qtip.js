define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/events/instance_qtip.html'
]
    , function ($, _, Tibbr, qTipTmpl) {
        return Tibbr.InstanceQtipView = Tibbr.View.extend({
            className:'action-menu-box qtip-content',
            events:{
                'click a.edit':'edit',
                'click a.delete':'destroy',
                'click a.status':'status'
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.parent = this.options.parent;

            },
            render:function () {
                $(this.el).html(this.template.render(qTipTmpl, {model:this.model}));
                return this;
            },
            edit:function () {
                this.parent.edit(this.model.attributes);
                this.parent.hideMenu();
                return false;
            },
            destroy:function (event) {
//                this.model.destroy($(event.target));
                this.parent.destroy();
                return false;
            },
            status:function (event) {
                this.model.updateStatus($(event.target).attr("rel"));
                return false;
            }
        });
    });