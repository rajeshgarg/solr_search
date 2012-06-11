define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/sub_questions.html'
  , 'views/subjects/subject_questions'
  ]
  , function ($, _, Tibbr,SubjectQuestions, QuestionView) {
    return Tibbr.SubjectQuestionView = Tibbr.View.extend({
      initialize:function () {
        _.bindAll(this, 'render');
       this.collection.bind('reset', this.render);
      },
      render:function () {
        $(this.el).html(this.template.render(SubjectQuestions, {model:this.model, collection:this.collection}));
        var question_collection = this.options.collection, $ele = this.$('#questions');
         question_collection.each(function (question) {
                    var view = new QuestionView({
                        model:question,
                        collection:question_collection
                    });
                    $ele.append(view.render().el);
               })
              return this;
      }

    });
  });