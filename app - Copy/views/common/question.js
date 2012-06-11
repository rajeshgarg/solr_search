define([
    "jquery"
    , "underscore"
    , "tibbr"

    , "text!templates/common/poll_multi.html"
    , "text!templates/common/poll_option.html"
    , "text!templates/common/more_poll_option.html"
    , 'views/common/option_item'
    , 'models/question_option'

]
    , function ($, _, Tibbr, pollMulti, pollOption, morePoll, OptionQuestionView, OptionQuestion) {
        return Tibbr.QuestionView = Tibbr.View.extend({
            tagName:"ul",
            events:{
                'focusin input.optiondefaultText':"addMoreOptions",
                'focusout input.optiondefaultText':"addMoreOptions",
                'click input#add_more_poll_option':"submitAddMore"
            },
            initialize:function () {
                _.bindAll(this, 'render','addMoreOptions','submitAddMore');
//                this.model.on("answered", this.render, this);
                this.model.on("change", this.render, this);
                this.render();
            },
            render:function () {
                var view, that = this, collection = this.model.options(), $ele = $(this.el).empty();

                // console.log(this.model.optionsAndVote()+"is the answer")
                collection.each(function (option) {
                    view = new OptionQuestionView({
                        model:option,
                        collection:collection,
                        parent:that
                    });
                    $ele.append(view.render().el);

                });

                if (that.model.get('allow_others_to_add_options')) {
                    $ele.append(that.template.render(morePoll, {model:this.model}));
                }


                return this;
            },
            addMoreOptions:function (event) {



                    this.$("#add_more_poll_option").show()

                return false

            },
            submitAddMore:function(){

                this.model.addMoreOption(this.$('input#more_poll_option').val());
            }



        });
    });
