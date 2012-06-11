define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'views/subjects/subject_item'
  ]
  , function ($, _, Tibbr,subjectItemView) {
    return Tibbr.SubjectListView = Tibbr.View.extend({
      tagName:"ul",
      className: "subject-list my-subject-list",
      initialize:function () {
        _.bindAll(this, 'render');
         this.collection.bind('reset', this.render);
      },
      render:function () {
        var collection = this.collection, $ele = $(this.el);;
        $ele.empty();
        collection.each(function (subject) {

          var view = new subjectItemView({
            model: subject,
            id:"subject_li_"+subject.get('id')
          });
         $ele.append(view.render().el);
        });
        return this;
            
      }

    });
  });