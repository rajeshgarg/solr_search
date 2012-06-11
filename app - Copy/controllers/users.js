define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'controllers/application'
    , 'models/user'
    , 'models/subject'
    , 'models/meta_detail'
    , "collections/subjects"
    , "collections/idols"
    , 'collections/followers'
    , 'collections/messages'
    , 'collections/all_messages'
    , 'collections/likes'
    , 'collections/channels'
    , "views/users/box_list"
    , "views/common/post"
    , "views/users/profile"
    , "views/users/edit"
    , 'views/messages/list'
    , 'views/users/profile_left_nav'
    , 'views/common/tabs'
    , 'views/users/about'
    , 'views/users/upload_photo'
    , 'views/common/meta_detail'
    , 'views/users/channel_list'
    , 'modules/overlay'
],
    function ($, _, Backbone, Tibbr, Application, User, Subject, MetaDetail, Subjects, Idols, Followers, Messages, AllMessages, Likes, Channels, UserBoxList, PostView, ProfileView, EditView, MessageListView, ProfileLeftNavView, TabsView, AboveView, UploadPhotoView, MetaDetailView, ChannelListView, Overlay) {
        return  Tibbr.Controller.extend({
            show:function () {
                var user = this.params.id ? new User({id:this.params.id}) : Tibbr.currentUser;
                if (user.id.toString() === Tibbr.currentUser.id.toString()) {           // If user.id is logged in user, then take to My Profile page, otherwise take to other user's profile page.
                    $("#main-sidebar, #sidebar, #content").empty();
                    this.setTabs(0);           //Passing the index of the tab to be set active
//                var user = new User({id:this.params.id});
                    var user = new User({id:Tibbr.currentUser.id});
                    var view = new ProfileLeftNavView({model:user});
                    user.fetch();
                    $("#main-sidebar").html(view.render().el);
                    this.messageList(Tibbr.currentUser.id)
                } else {
                    Tibbr.app.navigate(Tibbr.currentUser.userProfileUrl(user.id), true);
                }
            },
            profile:function () {
                var user = this.params.id ? new User({id:this.params.id}) : Tibbr.currentUser;
                if (user.id.toString() === Tibbr.currentUser.id.toString()) {             // If user.id is logged in user, then take to My Profile page, otherwise take to other user's profile page.
                    Tibbr.app.navigate(Tibbr.currentUser.showUrl(), true);
                } else {
                    user.fetch({data:{set_actions:true}, success:function () {
                        var view = new ProfileView({
                            model:user
                        });
                        Application.setProfileWallPost(user);
                        Application.postBoxView.trigger("subject.name:change", {name:user.get('display_name'), value:user.get('login')}); // set subject name to the box
                        $("#main-sidebar").html(view.render().el);
                        var messages = new Messages();
                        messages.scopeId = Tibbr.currentUser.id;
                        messages.fetch({data:{params:{set_actions:true, per_page:10, user_id:user.id}},
                            success:function (data) {
                                $("#wall-tabs-1").html(new MessageListView({collection:data}).render().el);
                            }, beforeSend:function () {
                                $("#wall-tabs-1").html(Tibbr.UI.loader);
                            }
                        })

                    }});
                }
            },

            edit:function () {
                var user = Tibbr.currentUser;
                if (this.params.id === user.id.toString()) {
                    var profile_left_nav_view = new ProfileLeftNavView({model:user});
                    $("#main-sidebar").html(profile_left_nav_view.render().el);
                    var meta_detail = new MetaDetail({attributes:user.attributes});
                    var edit_view = new EditView({model:user});
                    $("#content").html(edit_view.render().el);
                    var view = new MetaDetailView({model:meta_detail});
                    meta_detail.fetch(Tibbr.currentUser.metaDetailURL(), {success:function () {
                        $("#edit-profile-details").html(view.render().el);
                        $("#edit_profile").validate();
                    }})
                } else {
                    Tibbr.app.navigate("/", true);
                }
            },

            about:function () {
                this.setTabs(2);   //Passing the index of the tab to be set active
                this.leftnav_profile();
                var view = new AboveView({model:Tibbr.currentUser});
                $('#tab-content').html(view.render().el);
            },
            likes:function () {
                $("#main-sidebar, #sidebar, #content").empty();
                this.setTabs(1);   //Passing the index of the tab to be set active
                this.leftnav_profile();
                var likes = new Likes();
                likes.scopeId = Tibbr.currentUser.id;
                likes.fetch({data:{params:{set_actions:true, per_page:10, like_by:Tibbr.currentUser.id}},
                    success:function (data) {
                        $("#tab-content").html(new MessageListView({collection:data}).render().el);
                    }, beforeSend:function () {
                        $("#tab-content").html(Tibbr.UI.loader);
                    }
                })
            },
            upload_photo:function () {
                $("#main-sidebar, #sidebar, #content").empty();
                this.leftnav_profile();
                var view = new UploadPhotoView({model:Tibbr.currentUser});
                Overlay.view(view.render().el);
                return false;
            },
            messageList:function (userId) {
                var messages = new AllMessages();
                messages.scopeId = userId;
                messages.fetch({data:{params:{set_actions:true, per_page:10, user_id:userId}},
                    success:function (data) {
                        $("#tab-content").html(new MessageListView({collection:data}).render().el);
                    }, beforeSend:function () {
                        $("#tab-content").html(Tibbr.UI.loader);
                    }
                })
            },
            leftnav_profile:function () {
                var user = new User({id:Tibbr.currentUser.id});
                var view = new ProfileLeftNavView({model:user});
                user.fetch();
                $("#main-sidebar").html(view.render().el);
            },
            setTabs:function (activeIndex) {

                var settings = {
                    activeIndex:activeIndex,
                    tabs:[
                        {
                            name: Tibbr.translate("user.my_posts"),
                            url:Tibbr.currentUser.showUrl()
                        },
                        {
                            name: Tibbr.translate("user.my_likes"),
                            url:Tibbr.url("users/likes")
                        },
                        {
                            name: Tibbr.translate("user.about"),
                            url:Tibbr.url("users/about")
                        }
                    ]
                };
                $('#content').html(new TabsView({settings:settings}).render().el);

            },
            message_delivery:function () {
                this.leftnav_profile();
                var channels = new Channels();
                channels.scopeId = Tibbr.currentUser.id;
                channels.fetch({data:{params:{set_actions:true, page:1, per_page:30}},
                    success:function (data) {
                        $("#content").html(new ChannelListView({collection:data}).render().el);
                    }
                })
            }

        })
    });
