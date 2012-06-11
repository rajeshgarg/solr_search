define([
    "jquery"
    , "tibbr"
    , "models/message"
]
    , function ($, Tibbr, Message) {
        return    Tibbr.Likes = Tibbr.Collection.extend({
            className:"messages",
            tibbrURL:{controller:"users", action:"message_search"},
            model:Message,
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10, like_by:true}
                    }
                    });
            },
            getMoreMessages:function () {
                this.fetch({data:{params:{page:this.current_page + 1, per_page:10, like_by:true}}})
            }
        });

    });