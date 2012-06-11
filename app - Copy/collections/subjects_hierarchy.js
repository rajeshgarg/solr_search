define([
    "jquery"
    , "tibbr"
    , "collections/subjects"
]
    , function ($, Tibbr, Subjects) {
        return Tibbr.SubjectsHierarchy = Subjects.extend({
            className: "subjects_hierarchy",
            tibbrURL:{controller:"subjects", action:"roots"},
            load:function (callback){
                this.fetch({
                    data:{
                        params:{page:(this.current_page || 0) + 1, per_page:5,set_actions:true}
                    },
                    success: function(){
                        callback();
                    }
                });
            },
            getMoreSubjects:function (){
                this.fetch({
                    data:{
                        params:{page:this.current_page + 1, per_page:5,set_actions:true}
                    }
                });
            }
        });
    });