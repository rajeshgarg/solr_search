define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/subject_link_popup_tip.html'
    , 'modules/dialog'
]
    , function ($, _, Tibbr, subjectPopupTipTmpl, Dialog) {
        return Tibbr.SubjectPopupView = Tibbr.View.extend({
            className:'action-menu-box qtip-content',
            events:{
                'click a.play-sub':'play',
                'click a.pause-sub':'pause',
                'click a.unsubscribe-sub':'unsubscribe',
                'click a.delete-sub':'destroy'
            },
            initialize:function () {
                _.bindAll(this, 'render', 'destroy');
                this.model.on('actions:change', this.render, this);
            },
            render:function () {
                $(this.el).html(this.template.render(subjectPopupTipTmpl, {model:this.model}));
                return this;
            },
            play:function (event) {
                this.model.play();
                return false;
            },
            pause:function (event) {
                this.model.pause();
                return false;
            },
            unsubscribe:function (event) {
                this.model.unsubscribe();
                return false;
            },
            destroy:function (event) {
                var self = this;
                Dialog.remove({text:self.t("subject.delete.conformation"), okFunction:function () {
                    self.model.destroy($(event.target));
                }
                })
                return false;
            }
        });
    });