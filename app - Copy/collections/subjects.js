define([
    "tibbr"
    , "models/subject"
]
    , function (Tibbr, Subject) {
        return    Tibbr.Subjects = Tibbr.Collection.extend({
            className:"subjects",
            tibbrURL:{controller:"subjects", action:"parents"},
            model:Subject,
            load :function(callback){
                  this.fetch({data:{params:{page:"1" , per_page: "10"}},
                      success: function(){
                    callback();
                }});
            }
        });
    });