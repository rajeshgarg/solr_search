define([
    "underscore"
    , "tibbr"
    , 'collections/assets'
    , 'collections/links'
//    , 'collections/question_options'
    , 'models/user'
    , 'models/calendar'
    , 'models/question'
]
    , function (_, Tibbr, Assets, Links,User,Calendar,Question) {
        return Tibbr.Announcement = Tibbr.Model.extend({
            baseName:"messages",
            defaults: {
                modelType: "Announcement",
                "links":[],
                "assets":[]
            },
             initialize:function () {
                _.bindAll(this, 'type','canRemoveGlobalObject');
                 if (this.get('assets').length > 0) {
                    this.assets = new Assets(this.get('assets'));
                }
                if (this.get('links').length > 0) {
                    this.links = new Links(this.get('links'));
                }
                if (this.get('user')) {
                    this.user = new User(this.get("user"));
                }
                if (this.get('msg_type')==='calendar') {
                    this.calendar = new Calendar(this.get("calendar"));
                }
                if (this.get('msg_type')==='question') {
                    this.question = new Question(this.get("question"));
                }
            },
            type:function(){
                announcement_type = this.get('msg_type');
                switch(announcement_type){
                case 'question':
                    return 'poll';
                    break;
                case 'calendar':
                    return 'calendar';
                    break;
                case 'plain':
                    if(this.get('assets').length> 0){
                        return (this.assets.first().isImage()) ? "image" : "asset"
                    }
                    if(this.get('links').length > 0){
//                        link = this.links.first();
//                        need to check for video link and non video link
                        return "link"
                    }
                    return "post";
               }
            },
            canRemoveGlobalObject:function(){
              return _.include(this.get('actions'), 'remove_global_announcement');
            },
            canRemoveSubjectObject:function(){
              return _.include(this.actions(), 'remove_subject_announcement')
            },
            destroy:function () {
                var self = this;
                this.action("delete_announcement", "delete", {data:{announcement:{announcement_type:"global"}},
                    complete:function (data) {
                        if (data.status === 200) {
                            self.trigger("delete");
                        }
                    }
                });
            }
        });
    });
