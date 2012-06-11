define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.User = Tibbr.Model.extend(
            {
                baseName:"users",
                defaults:{
                    logged_in:false,
                    modelType:"User",
                    "profile_image_url":"small,/assets/images/users/profile_images/missing_small.png,medium,/assets/images/users/profile_images/missing_medium.png,large,/assets/images/users/profile_images/missing_large.png"
                },

                initialize:function () {
                    this._initialize()
                },
                _initialize:function () {
                    _.bindAll(this
                        , "isLoggedIn"
                        , "image"
                        , "showUrl"
                        , "editUrl"
                        , "uploadPhotoUrl"
                        , "changePasswordUrl"
                        , "msgDeliveryUrl"
                        , "userProfileUrl"
                        , "followers"
                        , "followingUrl"
                        , "followersUrl"
                        , "invitePeople"
                        , "hierarchyUrl"
                        , "follow"
                        , "unfollow"
                        , "messageDeliveryUrl"
                    );
                    if (typeof this.get('profile_image_url') !== undefined) {
                        var image = this.get('profile_image_url').split(','),
                            imageSmall = image[1];
                        if (imageSmall.match(/https?:\/\//)) {
                            this.set({'profileImage':image[1]});
                            this.set({'profileImageLarge':image[5]});
                            this.set({'profileImageMedium':image[3]});
                        }
                        else {
                            this.set({'profileImage':image[1]});
                            this.set({'profileImageLarge':image[5]});
                            this.set({'profileImageMedium':image[3]});
                        }
                    }
                },
                image:function (index) {
                    var img = this.get('profile_image_url').split(',')[index];
                    if (img.match(/https?:\/\//)) {
                        return img;
                    } else {
                        return Tibbr.assert(img);
                    }
                },
                followers:function () {
                    return this.dataSet.get("followers", this.id) || {}
                },
                following:function () {
                    return this.dataSet.get("idols", this.id) || {}
                },
                isLoggedIn:function () {
                    return this.get("logged_in");
                },
                showUrl:function () {
                    return this._url("users/" + this.id)
                },
                invitePeople:function (user_ids, email_id, recommendation_text, subject_id) {
                    return  this.action("recommend_a_subject", "create", {data:{params:{"user_ids":user_ids, "emails":email_id, "recommendation_text":recommendation_text, "subject_id":subject_id}}});

                },
                editUrl:function () {
                    return this._url("users/" + this.id + "/edit");
                },
                uploadPhotoUrl:function () {
                    return this._url("users/" + this.id + "/upload_photo");
                },
                changePasswordUrl:function () {
                    return this._url("users/" + this.id + "/change_password");
                },
                msgDeliveryUrl:function () {
                    return this._url("users/" + this.id + "/msg_delivery");
                },
                userProfileUrl:function (user_id) {
                    return this._url("users/" + user_id + "/profile");
                },
                changePassword:function (old_password, new_password, confirm_password, user_id) {
                    return this.action("change_password", "update", {
                        data:{params:{"password":old_password, "new_password":new_password, "new_password_confirmation":confirm_password, "id":user_id}},
                        complete:function (data) {
                            console.log(data)
                            if (data.status === 200) {
                                //alert("Password Changed successfully");
                                Tibbr.overlay.close();
                                return false;
                            }
                            if (data.status === 422) {
                                alert(data.responseText);
                            }
                        },
                        error:function (data) {
                            console.log(data)
                        },
                        success:function (data) {
                            console.log(data, "success")
                        }
                    });
                },
                followersUrl:function () {
                    return this._url("users/" + this.id + "/followers");
                },
                hierarchyUrl:function () {
                    return this._url("explore/people_directory?type=hierarchy&user_id=" + this.id)
                },
                follow:function (model, type) {

                    type = type || "follow";

                    if (type.toString() == "follow") {

                        this.action("follow", "update", {
                            complete:function (data) {
                                if (data.status == 200) {
                                    model.set("actions", model.get('actions').replace("follow", "unfollow"))
//                                    model.trigger("user:follow", Tibbr.currentUser.id);
                                }
                            },
                            data:{
                                params:{id:model.id}
                            }
                        });

                    } else if (type.toString() == "unfollow") {

                        this.action("unfollow", "update", {
                            complete:function (data) {

                                if (data.status == 200) {
                                    model.set("actions", model.get('actions').replace("unfollow", "follow"))
//                                    model.trigger("user:follow", Tibbr.currentUser.id);

                                }
                            },
                            data:{
                                params:{id:model.id}
                            }
                        });

                    }


                },
                unfollow:function (model) {

                    this.follow(model, "unfollow");
                },
                followingUrl:function () {
                    return this._url("users/" + this.id + "/following");
                },
                metaDetailURL:function () {
                    return this._path("users/" + this.id + "/meta_details");
                },

                playPause:function (type, subject) {
                    var actions = subject.get('actions'), changeTo = type === "play" ? "pause" : "play";
                    this.action(type, "update", {data:{params:{subject_id:subject.id}},
                        complete:function (data) {
                            if (data.status === 200) {
                                subject.set("actions", actions.replace(type, changeTo), {silent:true});
                                subject.trigger("actions:change");
                            }
                        }
                    });
                },
                unsubscribe:function (subject) {
                    this.action("unsubscribe", "update", {data:{params:{subject_id:subject.id}},
                        complete:function (data) {
                            if (data.status === 200) {
                                subject.trigger("delete", this);
                            }
                        }
                    });
                },
                actions:function () {
                    return this.get('actions').split(",");
                },
                search_users:function (page, per_page, search_str, set_actions) {
                    return this.action("search_users", "read", {data:{params:{"page":page, "per_page":per_page, "search_str":search_str, "set_actions":set_actions}}, complete:function (data) {
                        return data;
                    }})
                },
                subject_links:function (subject_id) {
                    return  this.action("subject_links", "read", {data:{params:{"subject_id":subject_id}}});
                },
                search_messages:function (page, per_page, search_str, set_actions) {
                    return this.action("message_search", "read", {data:{params:{"page":page, "per_page":per_page, "search_str":search_str, "set_actions":set_actions}}})
                },
                metaDetails:function (callback) {
                    this.action('meta_details', 'read', {
                        success:function (model, data) {
                            callback(data)
                        }
                    })
                },

                messageDeliveryUrl:function () {
                    return this._url("users/" + this.id + "/message_delivery")
                },

                shareMessage:function (model, text, user_ids, group_id) {
                    this.action("share_message", "create", {data:{params:{message_id:model.id, recommendation_text:text, user_ids:user_ids, group_ids:group_id}}, complete:function (data) {
                        if (data.status === 200) {
                            model.trigger("shareMessage:done");
                        }
                    }
                    })
                },

                channelAction:function (model, type) {
                    var self = this;
                    type = type || "channel_pause";
                    this.action(type, "update", { data:{params:{id:self.id, channel_id:model.id }},
                        complete:function (data) {
                            if (data.status === 200) {
                                model.trigger(type, this);
                            }
                        }});
                },

                channelActivate:function (model, activation_code) {
                    this.action("channel_activate", "update", { data:{params:{activation_code:activation_code, channel_id:model.id }},
                        complete:function (data) {
                            if (data.status === 200) {
                                model.trigger("success")
                            }
                        }});
                },

                scheduleChannel:function (channel) {
                    this.action("templated_channel_schedules", "read", {data:{params:{channel_id:channel.id}},
                        success:function (model, data) {
                            channel.trigger("schedule:reset", data)
                        }
                    });
                },
                createChannel:function (channel, subject_schedule) {
                    var data = JSON.stringify({params:{'channel_id':channel.id, 'subject_schedules':subject_schedule.toArray()}});
                    this.action("build_templated_channel_schedules", "update", {data:data, beforeSend:function (x) {
                        x.setRequestHeader("Content-type", "application/json; charset=utf-8");
                    },
                        complete:function (data) {
                            if (data.status === 200) {
                                channel.trigger("remove")
                            }
                        }
                    });
                }

            }
        );
    });
