define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/sub_links.html'
  , 'views/subjects/subject_links'
  , 'collections/subject_assets'
  , "views/subjects/sub_assets"
  , 'modules/overlay'
  , "views/subjects/edit_subject_title"
  , 'collections/subject_questions'
  , "views/subjects/sub_questions"
  ]
  , function ($, _, Tibbr,SubjectLinks, LinkView, Assets, SubjectAssetView, Overlay, EditSubjectTitleView, Questions, SubjectQuestionView) {
    return Tibbr.SubjectLinksView = Tibbr.View.extend({
      initialize:function () {
        _.bindAll(this, 'render');
       this.collection.bind('reset', this.render);
      },
      events:{
        "click a#edit_title":"edit_link_title"
      },
      edit_link_title:function () {
         var view = new EditSubjectTitleView({model:this.model})
         Overlay.view(view.render().el);
         return false;
      },
      render:function () {
          var subject = this.model;
        $(this.el).html(this.template.render(SubjectLinks, {model:this.model, collection:this.collection}));
        var links_collection = this.options.collection, $ele = this.$('#links');
        //subject links
         links_collection.each(function (link) {
                    var view = new LinkView({
                        model:link,
                        collection:links_collection
                    });
                    $ele.append(view.render().el);
       //subject files
                   var subject_id = subject.id;
                   var assets = new Assets();
                   assets.scopeId = Tibbr.currentUser.id;
                   assets.fetch({data:{params:{subject_id:subject_id, set_actions:true, per_page:5, set_action:true}}});
                   view = new SubjectAssetView({model:subject, collection:assets});
                   $("#subject-files").html(view.render().el);

        //subject questions
                   var questions = new Questions();
                   questions.scopeId = Tibbr.currentUser.id;
                   questions.fetch({data:{params:{subject_id:subject_id, set_actions:true, per_page:5, set_action:true}}});
                   view = new SubjectQuestionView({model:subject, collection:questions});
                   $("#subject-questions").html(view.render().el);
              })
              return this;
      }

    });
  });