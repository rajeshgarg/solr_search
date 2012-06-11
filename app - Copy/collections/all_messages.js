define([
    "jquery"
    , "tibbr"
    , "collections/messages"
]
    , function ($, Tibbr) {
        return Tibbr.AllMessages = Tibbr.Messages.extend({
            className: "all_messages",
            tibbrURL:{controller:"users", action:"message_search"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10, search_str: ""}
                    }
                    });
            }  ,
            subject_messages:function(search_str,messages_greater_than,messages_less_than,msg_type,mtypes,subject_ids,user_ids){
//                {"advanced_search_options"=> {"messages_greater_than"=>"2012-03-01", "messages_less_than"=>"2012-03-13", "msg_type"=>["link"], "mtypes"=>"", "subject_ids"=>["47"], "user_ids"=>["3"]}
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:10, search_str: search_str ,
                       advanced_search_options: {messages_greater_than:messages_greater_than,messages_less_than:messages_less_than, msg_type:msg_type, mtypes:mtypes, subject_ids:subject_ids, user_ids:user_ids}
                    }}
                    });

            }
        });
    });