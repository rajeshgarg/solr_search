define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/subject_questions.html'
  ]
  , function ($, _, Tibbr,subjectQuestion) {
    return Tibbr.SubjectQuestion = Tibbr.View.extend({
      initialize:function () {
        _.bindAll(this, 'render');

      },
      render:function () {
          $(this.el).html(this.template.render(subjectQuestion, {model: this.model, collection:this.collection}));
          return this;
      }

    });
  });