define([
    "tibbr"
    , "models/user"
]
    , function (Tibbr, User) {
        return    Tibbr.Subscribers = Tibbr.Collection.extend({
            className:"Subscribers",
            tibbrURL:{controller:"users", action:"subscribers"},
            model:User,
            data:function () {
                return {
                    params:{
                        set_actions:true,
                        page:(this.current_page || 0) + 1,
                        per_page:10,
                        subject_id: this.subject_id
                    }
                }
            }
        });

    });