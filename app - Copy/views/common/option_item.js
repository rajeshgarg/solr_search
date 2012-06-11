define([
    "jquery"
    , "underscore"
    , "tibbr"

    , "text!templates/common/poll_multi.html"
    , "text!templates/common/poll_option.html"

]
    , function ($, _, Tibbr, pollMulti, pollOption) {
        return Tibbr.OptionView = Tibbr.View.extend({
            tagName:"li",
            events:{
                "change input.vote-action":"vote",
                'mouseenter div.tb-poll-result-bar':'showVotes',
                'mouseleave div.tb-poll-result-bar':'showVotes'


            },
            initialize:function () {

                _.bindAll(this, 'render', 'vote', 'showVotes');
                this.parent = this.options.parent;
//                this.model.on("answered", this.render, this);
                this.render();

            },
            render:function () {
               //  console.log("it is"+this.parent.model.get("is_active"))
                if(!this.parent.model.get("is_active")) {
                    this.$('.vote-action').attr("disabled","disabled")
                }
                if (this.parent.model.get('multi_select')) {

                    this.$el.html(this.template.render(pollMulti, {model:this.model})).find(".vote-action").attr("checked", this.model.hasSelected())
                    // console.log(this.model.get('question_options'))
                    //  console.log( "in function"+this.model.optionsAndVote() )
                }
                else
                    this.$el.html(this.template.render(pollOption, {model:this.model})).find(".vote-action").attr("checked", this.model.hasSelected());


                var first = parseInt(this.model.get('option_users_count'))
                var second = this.parent.model.getTotalVotes(this.model.get('question_id'))
                this.$('#_' + this.model.get('question_id')).css('width', (first / second) * 100 + '%')


                return this;
            },
            showVotes:function (event) {

                if (event.type == 'mouseleave') {
                    //   console.log("in leabve")
                    this.$(".vote-count-label").css("visibility", "hidden")
                } else {
                    this.$(".vote-count-label").css("visibility", "visible")
                }
            },

            vote:function (event) {


                var action = $(event.target).is(":checked") ? "answer" : "unanswer";
                this.parent.model.voteOption(action, this.model)


            }


        });
    });
