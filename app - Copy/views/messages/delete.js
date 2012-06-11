define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/messages/delete.html'
]
    , function ($, _, Tibbr, deleteTmpl) {
        return Tibbr.MessageDeleteView = Tibbr.View.extend({
            className:"confirm-delete",
            initialize:function () {
                _.bindAll(this, 'render', 'cancel');
            },
            events:{
                "click a.cancel-btn":"cancel",
                "click a.yes":"yes"
            },
            render:function () {
                $(this.el).html(this.template.render(deleteTmpl));
                return this;
            },
            cancel:function () {
                $(this.el).parent().children(":not('.hidden')").show();
                $(this.el).remove();
                return false;
            },
            yes:function () {
                if (this.model.get('parent_id', null)) {
                    var $parent = $(this.el).parents("ul.replies").first();
                    if ($("li.reply", $parent).length === 1 && $("li.like", $parent).not(":hidden").length === 0)
                        $parent.addClass("hidden");
                    else
                        $parent.removeClass("hidden");
                }
                var self = this;
                this.model.destroy({complete:function() {
                    self.options.replyList.remove(self.model, {silent:true})
                    self.options.replyList.trigger("replyDeleted", -1);
                }
                });
                $(this.el).parent().remove();
                return false;
            }
        });
    });