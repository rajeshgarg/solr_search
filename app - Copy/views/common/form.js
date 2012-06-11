define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/meta_detail'
    , 'require/fcbk_complete'
    , 'require/validate'
    , 'views/common/meta_detail'
    , 'text!templates/common/form.html'
]
    , function ($, _, Tibbr, MetaDetail, FcbkComplete, Validate, MetaDetailView, form) {
        return  Tibbr.StreamItemView = Tibbr.View.extend({
            id:"event-streams-configure",
            className:"grid_16",
            initialize:function (options) {
                _.bindAll(this, 'render', 'save', 'close', 'cancel', 'handelDependency', 'resetSave');
                this.model.bind('reset', this.render);

            },
            events:{
                "click input.save":"save",
                "click a.cancel":"cancel",
                "click li.has_dependents  input":"handelDependency",
                "change li.has_dependents  select":"handelDependency"
            },
            render:function () {
                $(this.el).html(this.template.render(form, {header:this.options.header || ""}));
                var self = this, model = new MetaDetail({extraData: this.options.extraData, attributes: this.options.attributes || {}});
                this.form = new MetaDetailView({model:model});
                model.fetch(this.options.url, {success:function () {
                    self.$("form").prepend(self.form.render().el).show();
                    self.renderFcbk(self.$("select#subjects"), Tibbr.serverUrl("users", "list_message_targets", Tibbr.user.id), "validateSubjects");
                    self.renderFcbk(self.$("select#users"), Tibbr.serverUrl("users", "list_message_targets", Tibbr.user.id), "validateUsers");
                    $.validator.addMethod("validateSubjects", function (value) {
                        return  self.validateForInput("subjects");
                    }, self.t("common.hints.choose_subject_list"));
                    $.validator.addMethod("validateUsers", function (value) {
                        return  self.validateForInput("users");
                    }, self.t("common.hints.choose_user_list"));
                    self.$("form").validate({onkeyup:false});
                    self.$("input[rel=share_option]:checked").click();
                }});
                return this;
            },
            close:function () {
                this.remove();
                this.trigger("close");
            },
            cancel:function () {
                this.close();
                return false;
            },
            save:function () {
                if (this.$("form").valid()) {
                    this.$(".save").after(window.spinner).attr("disabled", true);
                    this.trigger("save", this.form.getValue());
                } else {
                    this.trigger("error");
                }
                return false;
            },
            resetSave:function () {
                this.$(".save").removeAttr("disabled").parent().find(".spinner").remove();
            },
            renderFcbk:function ($element, url, validationName) {
                $element.fcbkcomplete({json_url:url, filter_selected:true, filter_hide:true, cache:false, maxitems:20, height:10, validateFunction:validationName});

            },
            handelDependency:function (event) {
                var val, $self = $(event.target), children;
                if (event.target.type == "radio") {
                    try {
                        val = $self.val().toLowerCase();
                    } catch (e) {/**/
                    }
                    children = $self.attr("rel");
                } else {
                    val = $self.find("option:selected").val().toLowerCase();
                    children = $self.attr("rel");
                }
                this.$(".dependency." + children).hide();
                if (val != "") this.$(".dependency." + children + "." + val).show();

            },
            validateForInput:function (input) {
                this.$("#" + input + "_maininput").last().val("");
                return 0 !== this.$('#' + input + ' option:selected').size();
            }
//            edit:function () {
//                var self = this;
//                var model = new MetaDetail({modelType: "users"});
//                var view = new MetaDetailView({model:model});
//                model.fetch(Tibbr.currentUser.metaDetailURL(), {success:function () {
//                    self.$("form").html(view.render().el).show();
//                }})
//            }
        });
    });