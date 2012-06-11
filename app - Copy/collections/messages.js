define([
    "jquery"
    , "tibbr"
    , "models/message"
]
    , function ($, Tibbr, Message) {
        return    Tibbr.Messages = Tibbr.Collection.extend({
            className:"messages",
            tibbrURL:{controller:"users", action:"messages"},
            model:Message,
            type:null,
            data:function () {
                console.log(this.type)
                var _data = {page:(this.current_page || 0) + 1, set_actions:true, per_page:10};
                if (this.type) _data.include_wall_message_types = this.type;
                return _data;
            },
            load:function () {
                this.fetch({data:{params:this.data()}});
            },
            getMoreMessages:function () {
                this.fetch({data:{params:this.data()}})
            }
        });

    });