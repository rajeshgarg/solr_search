define([
    'underscore'
    , 'tibbr'
    , 'collections/question_options'
]
    , function (_, Tibbr, QuestionOptions) {
        return Tibbr.Question = Tibbr.Model.extend({
            baseName:"questions",
            initialize:function () {
                _.bindAll(this, 'voteOption', 'optionsAndVote', 'getTotalVotes','addMoreOption');
                this.options();
            },
            optionsAndVote:function () {
                var options = this.question_options,
                    option = this.question_options.first(),

                    tempCount = parseInt(option.option_users_count), totalVotes = 0;
                //console.log(options)
                _.each(options, function (opt) {

                    var votesCount = parseInt(opt.option_users_count);
                    totalVotes += votesCount;
                    if (votesCount > tempCount) {
                        tempCount = votesCount
                    }
                    option = opt
                });
                return [option, totalVotes]
            },
            options:function () {
                   return this.question_options = new QuestionOptions(this.get('question_options'));
            },


            voteOption:function (type, model) {
                var that = this;
                this.action(type, "update", {data:{params:{question_option_id:model.id, set_actions:true}}, success:function (model, data) {
                    that.trigger("answered");

                }})
            },
            addMoreOption:function (label) {

                            this.action("add_question_option", "update", {data:{params:{question_option: {option_label: label}, set_actions:true}}})
                        },

            getTotalVotes:function (optId) {
                var totalVotes = 0;
                this.options().map(function (opt) {
                    //  console.log(opt.get('option_label'))
                    if (opt.get('question_id') === optId) {

                        totalVotes += parseInt(opt.get('option_users_count'));
                    }


                })

                return totalVotes;


            }


        });
    });
