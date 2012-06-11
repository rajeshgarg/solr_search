define(['jquery'
    , 'underscore' 
    , 'tibbr'
    , 'views/subjects/subject_left_nav'
    , 'views/subjects/subject_follower'
    , 'models/subject'
     , "views/explore/layout"
    , "views/subjects/popular_list"
    , "collections/subjects_hierarchy_child"
    , "views/subjects/sub_subject"
],
   function($, _ ,Tibbr, SubjectLeftNavView, SubjectFollowerView,   Subject,Layout, ResultList ,SubSubject,SubSubjectView){
       return  Tibbr.Controller.extend({
             sub_directory:function () {
                var subject = new Subject({id:1 }); //new Subject({id:this.params.id });
                var view = new Layout({model: subject, params: this.params });
                var subSubjectList = new SubSubject();
                $("#content").html(view.render().el)
                subSubjectList.scopeId = 6;

                


                 new ResultList({collection:subSubjectList,model:subject })
                subSubjectList.fetch()//({ data: {params:{starts_with_first_name: this.params.s_with}}});
                this.subjectleftnav();
            },
           subjectleftnav: function(){
                var subject = new Subject({id:6 });  //new Subject({id:this.params.id});
                 var subSubjectList = new SubSubject();

                subSubjectList.scopeId = 6;
              //   new ResultList({collection:subSubjectList,model:subject })
              
                subject.fetch();
                var view = new SubjectLeftNavView({
                    model:subject                    
                });
               
                $("#main-sidebar").html(view.render().el);                    
                var sub_subject_view = new SubSubjectView({ model:subject
                   ,collection:subSubjectList
                });
                subSubjectList.fetch();
           }
       })

   }

  )

