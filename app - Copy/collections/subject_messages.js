define([
    'tibbr'
    , 'models/message'
]
    , function (Tibbr, Message) {
        return    Tibbr.SubjectMessages = Tibbr.Collection.extend({
            className:"SubjectMessages",
            tibbrURL:{controller:"users", action:"subject_messages"},
            model:Message,
            load:function (id) {
                this.subject_id = id;
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, subject_id:id, set_actions:true, per_page:10}
                    }
                    });
            },
            getMoreMessages:function () {
                this.fetch({data:{params:{page:this.current_page + 1, per_page:10, subject_id:this.subject_id, set_actions:true}}})
            }


        });

    });