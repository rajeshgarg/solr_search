define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "modules/dialog"
    , 'text!templates/subjects/new_edit_form.html'
]
    , function ($, _, Tibbr,Dialog, NewEditFormTmpl) {
        return Tibbr.SubjectNewFormView = Tibbr.View.extend({
            className:"",
            errors: [],
            events:{
                "click .submit-btn": "post",
                "keyup #subject-display_name":"formatSubjectName"
            },
            initialize:function () {
                _.bindAll(this, 'render','parseResponse');
            },
            render:function () {
                $(this.el).html(this.template.render(NewEditFormTmpl, {}));
                this.$('form').attr("action", Tibbr.serverUrl("subjects"));
                this.$('iframe').on('load',this.parseResponse);
                return this;
            },
            formatSubjectName: function(){
                var disp_name = $("#subject-display_name").val();
                var subj_disp_name = disp_name.replace(/[\,\;\:\.\!\'\#\$\%\&\*\+\-\/\=\?\^\_\`\{\|\}\~\[\]\(\)\\\@\<\>\s]/gi, "_"); //replacing wild characters with underscore
                $("#subject-name").val(subj_disp_name);
            },
            post:function (event) {
                if (this.validateForm($(event.currentTarget))) {
                    this.$("input:not('.required')").each(function (index, input) {
//                        Disable the input fields which are not supposed to be submitted.
//                        if ($(item).val().length === 0) {
//                            $(item).attr("disabled", "disabled");
//                        }
                    });
                    this.$('li:last').append(Tibbr.UI.spinner);
                    this.$('.spinner').css('float','right');
                    this.$("form").submit();
                } else {
                    Dialog.alert({text:this.errors.join("<br/>")});
                    this.errors = [];
                }
                return false;
            },
            validateForm:function ($currentTarget) {
                var result = true;
                if (this.$("#subject-display_name").val().trim().length == 0) {
                    result = false;
                    this.errors.push("Subject name is required!")
                }

                return result;
            },
            parseResponse:function () {
                var ret = this.$('iframe').contents().find("body").html();
                var data = {};
                try {
                    data = eval("(" + ret + ")");
                    if (data.id === undefined) {
                        Dialog.alert({text:_.flatten(data)[1] || "ERROR WHILE POSTING"});
                        //this.resetButton();
                    }
                    else {
                    //  Tibbr.app.navigate(Tibbr.url("subjects/")+data.id,true); if this is used title bar shows 'connecting...' text and a loading icon
                        window.location.hash = Tibbr.url("subjects/")+data.id;
                    }
                } catch (e) {
                }
                return false;
            }

        });
    });