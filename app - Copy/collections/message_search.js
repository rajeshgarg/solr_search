define([
    'tibbr'
    , 'models/message'
]
    , function (Tibbr, Message) {
        return    Tibbr.MessageSearch = Tibbr.Collection.extend({
            className:"stream-event",
            tibbrURL:{controller:"users", action:"message_search"},
            model:Message,
            load:function (id) {
                this.filterID = id;
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, message_filter_id:id, set_actions:true, per_page:10}
                    }
                    });
            },
            getMoreMessages:function () {
                this.fetch({data:{params:{page:this.current_page + 1, per_page:10, message_filter_id:this.filterID, set_actions:true}}})
            }


        });

    });