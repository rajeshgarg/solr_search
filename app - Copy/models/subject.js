define([
    'underscore'
    , 'tibbr'
    , 'models/user'
    , 'models/geo_location'
    , 'collections/users'
    , 'collections/assets'
    , 'collections/links'
    , 'collections/replies'
    , 'require/moment'
]
    , function (_, Tibbr, User,GeoLocation, Users, Assets, Links, Replies, moment) {
        return Tibbr.Subject = Tibbr.Model.extend({
            baseName:"subjects",
            excludeActions:['msg_create', 'msg_reply', 'add_child', 'invite'],
            defaults:{
                user:null,
                modelType:"Subject",
                "assets":[],
                "like_to":[],
                "links":[],
                "subjects":[],
                "messages":[],
                "owners":[],
                "user_image":[]
            },
            profileImageMedium:'/assets/images/subjects/subject_images/missing_large.png',
            initialize:function () {
                _.bindAll(this, 'displayName', 'createdAt', 'showUrl', 'getRecentSubjectUrl', 'description', 'analyticsNodes', 'subjectOwnerImage',
                    'isSubjectOwner', 'scope', 'createdDate', 'getUserUrl', 'userProfileUrl', 'actions', 'isSubjectFollower', 'fileContentType', 'countTotalVotes', 'moreTrendsUrl');
                if (typeof this.get('subject_image_url') != 'undefined') {

                    var image = [];

                    image = this.get('subject_image_url').split(',');
                    var profileImageSmall = image[3] || "";
                    if (profileImageSmall.toLowerCase().indexOf("http://") == -1 && profileImageSmall.toLowerCase().indexOf("https://") == -1) {
                        this.set({'profileImageMedium':profileImageSmall});
                    }
                    else {
                        this.set({'profileImageMedium':Tibbr.assert(profileImageSmall)});
                    }

                }
                this.build();
            },
            image:function () {
                return this.get('profileImageMedium');
            },

            actions:function () {
                var actions = _.difference(this.get('actions').split(","), this.excludeActions);
                if (_.include(actions, 'edit')) actions.push("move");
                return actions
            },
            subjectFollowerCount:function () {
                if (this.get("subscribers") === undefined) {
                    return 0;

                } else {
                    return this.get("subscribers").total_entries;
                }
            },
            userProfileUrl:function () {
                return this._url("users/" + this.get("user").id + "/profile"); // /users/3016/profile";
            },
            subjectFollower:function () {

            },
            analyticsNodes:function () {
                return   this.get("analytics_f_nodes") || [];
            },
            subjectOwnerImage:function (image_url) {
                var image = image_url.split(',');
                var userProfileImageSmall = image[3];
                return  image[3];


            },
            imageUrl:function (image_url) {
                var image = image_url.split(',');
                var userProfileImageSmall = image[3];
                return  image[3];
            },
            displayName:function () {
//                return this.get("name").replace(/\./g, " ");
                return this.get("display_name");
            },
            createdAt:function () {
                return moment(this.get("created_at")).format('MMMM Do YYYY, h:mm:ss a');
            },
            description:function () {
                return this.get("description");
            },
            showUrl:function () {
                return this._url("subjects/" + this.id)
            },
//            function: geturl
//            return url for given id.
//            sometime get info but not use as object, so showUrl not accessible for those
            getUrl:function (id) {
                return this._url("subjects/" + id)
            },
            getRecentSubjectUrl:function () {
                return this._url("subjects/recent_subjects")
            },
            scope:function () {
                return this.get("scope")
            },

            isSubjectOwner:function () {
                return (this.get('user').login == Tibbr.currentUser.get('login'))
            },
            /**
             *function isSubjectFollower to check user is following the subject or user is owner
             *subscriber user may be single or may be array
             */
            isSubjectFollower:function () {
                var is_follower = false, subscribers = this.get("subscribers").user;
                if (_.isArray(subscribers)) {
                    _.each(subscribers, function (user) {
                        if (user.id == Tibbr.currentUser.id) {
                            is_follower = true;
                        }
                    });
                }
                return is_follower;
            },
            createdDate:function () {
                return moment(this.get("created_at")).format('MMMM Do YYYY');
            },
            destroy:function () {
                var self = this;
                this.action("delete", "update", {data:{params:{subject_id:this.get('id')}},
                    complete:function (data) {
                        if (data.status === 200) {
                            self.trigger("delete");
                        }
                    }
                });
            },
            play:function () {
                Tibbr.currentUser.playPause("play", this);
            },
            pause:function () {
                Tibbr.currentUser.playPause("pause", this);
            },
            unsubscribe:function () {
                Tibbr.currentUser.unsubscribe(this);
            },

            build:function () {
                if (this.get('user')) {
                    this.user = new User(this.get("user"));
                }
                if (this.get('owners')) {
                    this.owners = new Users(this.get("owners"));
                }
                if (this.hasLikes) {
                    this.like_to = new Users(this.get("like_to"));
                }
                if (this.get('assets').length > 0) {
                    this.assets = new Assets(this.get('assets'));
                }
                if (this.get('links').length > 0) {
                    this.links = new Links(this.get('links'));
                }

            },
            getUserUrl:function () {
                if (this.get('user')) {
                    return this._url("users/" + this.get('user').id)
                }
            },
            getSubjectOwner:function () {
                var is_owner = false, owner_ids = [], owners = this.get("owners");
                if (_.isArray(owners)) {
                    _.each(owners, function (user) {
                        owner_ids.push(user.id)
                    });
                }
                return owner_ids;
            },
            fileContentType:function (data_content_type) {
                switch (data_content_type) {
                    case 'application/pdf':
                        return 'pdf-icon';
                        break;
                    case 'application/msword':
                        return 'word-icon';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        return 'word-icon';
                        break;
                    case 'text/plain':
                        return 'txt-icon';
                        break;
                    case 'application/pdf':
                        return 'pdf-icon';
                        break;
                    case 'application/vnd.ms-excel':
                        return 'xls-icon';
                        break;
                    case 'application/zip':
                        return 'zip-icon';
                        break;
                    case 'application/vnd.ms-powerpoint':
                        return 'ppt-icon';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                        return 'ppt-icon';
                        break;
                    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        return 'xls-icon';
                        break;
                    case 'application/x-zip-compressed':
                        return 'zip-icon';
                        break;
                    case 'application/octet-stream':
                        return 'zip-icon';
                        break;
                    default:
                        return 'clip-icon';
                        break;
                }
            },
            countTotalVotes:function (question_options) {
                var length = question_options.length;
                var total_votes = 0;
                for (var i = 0; i < length; i++) {
                    total_votes += parseInt(question_options[i].option_users_count);
                }
                return total_votes;
            },
            moreTrendsUrl:function () {
                return this._url("subjects/" + this.id + "/analytics")
            }
        });
    });
