define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/common/subject_tab.html'
  ]
  , function ($, _, Tibbr, subjectTab) {
    return Tibbr.SubjectTab = Tibbr.View.extend({
      className:'subject-tab-class',
      id: "subject-tab-div",
      initialize:function () {
        _.bindAll(this, 'render');
      },
      render:function () {
        $(this.el).html(this.template.render(subjectTab));
        return this;
      }
    });
  });