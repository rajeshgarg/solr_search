define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/subject_assets.html'
  ]
  , function ($, _, Tibbr,subjectAsset) {
    return Tibbr.SubjectAsset = Tibbr.View.extend({
      initialize:function () {
        _.bindAll(this, 'render');

      },
      render:function () {
          $(this.el).html(this.template.render(subjectAsset, {model: this.model, collection:this.collection}));
          return this;
      }

    });
  });