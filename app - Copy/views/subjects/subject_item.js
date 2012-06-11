define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/subject_item.html'
  , 'views/common/subject_link_tip'
  ]
  , function ($, _, Tibbr, subjectItem,SubjectPopupView) {
    return Tibbr.SubjectItemView = Tibbr.View.extend({
      tagName:"li",
      className:"subject-li",
      qtipConfig: Tibbr.qtipConfigs.menu,
      initialize:function () {
        _.bindAll(this, 'render');
        this.model.on('delete', this.remove, this);
//          this.model.on('status', this.render, this);
      },
      render:function () {
        $(this.el).html(this.template.render(subjectItem, {model:this.model}));
         var popup = new SubjectPopupView({model:this.model});
         $(this.el).append(popup.render().el);
         $('.q-tip',$(this.el)).qtip(this.qtipConfig($(this.el)));
        return this;
      }
    });
  });