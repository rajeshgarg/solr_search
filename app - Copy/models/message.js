define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/user'
    , 'models/geo_location'
    , 'models/calendar'
    , 'models/question'
    , 'collections/users'
    , 'collections/subjects'
    , 'collections/assets'
    , 'collections/links'
    , 'collections/replies'
    , 'require/moment'
]
    , function ($, _, Tibbr, User, GeoLocation, Calendar,Question, Users, Subjects, Assets, Links, Replies, moment) {
        return Tibbr.Message = Tibbr.Model.extend({
            baseName:"messages",
            excludeActions:['msg_reply', 'like', 'star', 'unlike', 'unstar'],
            includeActions:['email', 'add', 'copy_link'],
            defaults:{
                modelType:"Message",
                "user":null,
                "links":[],
                "assets":[],
                "like_to":[],
                "subjects":[],
                "messages":[]
            },

            initialize:function () {
                _.bindAll(this, 'build', 'postedTo', 'postedAt', 'showUrl', 'numberOfReplies', 'hasLikes', 'like', 'actions', 'hasStar', "isParent", "hasGeoMap", 'getMessageType');
                this.build();

            },
            actions:function () {
                return _.union(_.difference(this.get('actions').split(","), this.excludeActions), this.includeActions);
            },

            hasStar:function () {
                return this.get('actions').match(/unstar/);
            },
            isParent:function () {
                return !(this.get('parent_id', null));
            },
            postedTo:function () {
                return (this.subjects || []).map(function (subject) {
                    var icon = subject.get('stype') === "system" ? "people" : "subject";
                    return {icon:icon + "-icon", name:subject.get('display_name'), url:subject.showUrl()}
                })
            },

            postedAt:function () {
                return moment(this.get("created_at")).format('MMMM Do YYYY, h:mm:ss a');
            },

            getMessageType:function () {
                return this.get('msg_type');
            },
            numberOfReplies:function () {
                return this.get('replies_count')
            },
            showUrl:function () {
                return this._url("messages/" + this.id)
            },
            like:function (like) {
                var likes = this.like_to || new Users();
                if (!like) {
                    this.action("like", "update");
                    likes.add(new User(Tibbr.currentUser));

                } else {
                    this.action("unlike", "delete");
                    likes = likes.reject(function (user) {
                        return user.id === Tibbr.currentUser.id
                    });
                    likes = new Users(likes)
                }
                this.like_to = likes;
                this.trigger("like:change")
            },
            hasLikes:function () {
                return this.get('like_to').length > 0
            },
            mute:function (type) {
                var model = this;
                type = type || "mute";
                this.action(type, "update", {
                    complete:function (data) {
                        if (data.status === 200) {
                            model.trigger("message:" + type, this);
                        }
                    }});
            },
            unmute:function () {
                this.mute("unmute");
            },

            hasGeoMap:function () {
              return this.geo_location !== undefined
            },
            build:function () {
                if (this.get('user')) {
                    this.user = new User(this.get("user"));
                }
                if (this.hasLikes) {
                    this.like_to = new Users(this.get("like_to"));
                }
                if (this.get('subjects').length > 0) {
                    this.subjects = new Subjects(this.get('subjects'));
                }
                if (this.get('assets').length > 0) {
                    this.assets = new Assets(this.get('assets'));
                }
                if (this.get('links').length > 0) {
                    this.links = new Links(this.get('links'));
                }
                if (this.get('calendar')) {
                    this.calendar = new Calendar(this.get('calendar'));
                }
                if (this.get('question')) {
                    this.question = new Question(this.get('question'));
                }
                if (this.get('geo_location')) {
                    this.geo_location = new GeoLocation(this.get('geo_location'));


                }
            },
            addSubjects:function (users) {
                var model = this;
                this.action("add_subjects", "update", {data:{params:{subject_ids:users}}, complete:function (data) {
                    if (data.status === 200) {
                        model.trigger("addSubject:done");
                    }
                }
                })

            }

        });
    });