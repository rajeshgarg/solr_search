define([
    "tibbr"
    , "models/question_option"
]
    , function (Tibbr, QuestionOption) {
        return Tibbr.QuestionOptions = Tibbr.Collection.extend({
            className:"question_options",
            model:QuestionOption
        });

    });