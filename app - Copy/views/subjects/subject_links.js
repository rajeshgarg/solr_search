define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/subject_links.html'
  ]
  , function ($, _, Tibbr,subjectLink) {
    return Tibbr.SubjectLink = Tibbr.View.extend({
      tagName: "li",
      initialize:function () {
        _.bindAll(this, 'render');
         
      },
      render:function () {
          this.$el.html(this.template.render(subjectLink, {model: this.model}));
          return this;
      }

    });
  });