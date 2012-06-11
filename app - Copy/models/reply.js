define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/user'
    , 'models/geo_location'
    , 'collections/assets'
    , 'collections/links'
    , 'collections/users'
    , 'require/moment'
]
    , function ($, _, Tibbr, User, GeoLocation, Assets, Links, Users, moment) {
        return Tibbr.Reply = Tibbr.Model.extend({
            baseName:"messages",
            defaults:{
                "user":null,
                "links":[],
                "assets":[],
                "like_to":[],
                modelType:'MessageReply'
            },

            initialize:function () {
                _.bindAll(this, 'build', 'postedAt', 'hasLikes', 'like', "hasGeoMap");
                this.build();

            },

            postedAt:function () {
                return moment(this.get("created_at")).format('MMMM Do YYYY, h:mm:ss a');
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
            hasGeoMap:function () {


                if (this.geo_location === undefined)
                    return false;
                else return true;
            },
            build:function () {
                if (this.get('user')) {
                    this.user = new User(this.get("user"));
                }
                if (this.get('like_to').length > 0) {
                    this.like_to = new Users(this.get("like_to"));
                }
                if (this.get('assets').length > 0) {
                    this.assets = new Assets(this.get('assets'));
                }
                if (this.get('links').length > 0) {
                    this.links = new Links(this.get('links'));
                }
                if (this.get('geo_location')) {
                    this.geo_location = new GeoLocation(this.get('geo_location'));
                    this.geo_location.latitude = new GeoLocation(this.get('geo_location')).get('latitude');
                    this.geo_location.longitude = new GeoLocation(this.get('geo_location')).get('longitude');

                }
            }


        });
    });