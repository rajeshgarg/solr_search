define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/user'
    , 'text!templates/subjects/subject_left_nav.html'
    , 'views/subjects/sub_subject_list'
    , 'views/subjects/popular_list_item'
    , 'views/subjects/invite_people'
    , 'views/subjects/subject_notification'
    , 'modules/overlay'
    , 'models/role'
    , 'views/subjects/assign_owner_to_subject'
    , 'views/subjects/find_subject_follower'
    , "collections/users_search"
    , "collections/subjects"
    , 'collections/channels'
    , "models/channel"
    , "views/subjects/right_side_subject_follower"
    , "views/subjects/subject_location"
    , 'views/common/follow_button'
    , 'text!templates/subjects/subject_notification.html'
]
    , function ($, _, Tibbr, User, SubLeftNav, SubSubjectList, PopularListItem, InvitePeople, SubjectNotification, Overlay, Role, AssignOwner, FindSubjectFollower, UserSearch, Subjects, Channels, Channel, RightSideSubjectFollower, SubjectLocation, FollowButtonView, SubjectNotificationTemp) {
        return Tibbr.SubjectLeftNav = Tibbr.View.extend({
            className:"profile-wrap",
            "messsage_replies":0,
            qtipConfig:Tibbr.qtipConfigs.popup,
            "hasNotification":false,
            initialize:function () {
                _.bindAll(this, 'render', 'subject_location');
                this.model.bind('change', this.render);
            },
            events:{
                "click #notify":"notification",
                "click a#invite_people":"invite_people",
                "click a#edit_subject":"edit_subject",
                "click a#assignOwner":"assign_owner_to_subject"
            },
            invite_people:function () {

                var view = new InvitePeople({
                    model:this.model
                });
                Overlay.view(view.render().el);
                return false;
            },
            edit_subject:function () {

                return false;
            },
            assign_owner_to_subject:function () {
                var role = new Role();
                role.find_by_rolename_and_context('subject_owner', this.model.id, this.model.get('modelType'));
                var assign_owner_view = new AssignOwner({
                    model:this.model,
                    role:role
                });
                Overlay.view(assign_owner_view.render().el);
                return false;
            },

            render:function () {
                var subsubjects = this.sub_subjects(), owners_ids = this.model.getSubjectOwner();
                $(this.el).html(this.template.render(SubLeftNav, {
                    model:this.model,
                    currentUser:Tibbr.currentUser,
                    sub_subjects:subsubjects,
                    is_owner:_.include(owners_ids, Tibbr.currentUser.id)
                }));
//                this.showGeo();
                var followButtonView = new FollowButtonView({model:this.model});
                this.$('.action-button').append(followButtonView.render().el);
                var $ele = this.$("#notification-data");
                $ele.html(this.template.render(SubjectNotificationTemp));
                this.subject_location();
                return this;

            },
            right_side_bar:function () {
                var $ele = this.$("#sidebar");
            },
            add_subject_notification:function () {
                var $ele = this.$("#owner_inner");
                this.hasNotification = true;
                if (this.options.channels.length === 0) {
                    this.$("#owner_inner").html("<p><a href=''>Set Up Notification</a></p>");
                }
                var subject_id = this.model.id;
                this.options.channels.each(function (channel) {
                    Tibbr.currentUser.action("templated_channel_schedules", "get", {data:{params:{channel_id:channel.id}},
                        success:function (response) {
                            $ele.append(new SubjectNotification({
                                model:channel,
                                schedules:function () {
                                    var schedules = "0";
                                    _.each(response.get("subject_schedules"), function (schedule) {
                                            if (schedule.subject_id == subject_id) {
                                                schedules = schedule.schedules;
                                            }
                                        }
                                    );
                                    return  schedules;
                                },
                                subject_id:subject_id
                            }).render().el);
                        }
                    });

                });
            },

            showGeo:function () {
                               //  console.log(this.model.get('geo_location'))    ;
                var $div = this.$(".geo-map");
                if ($div.hasClass("loaded")) {
                    $div.slideToggle("slow");
                    return false;
                }
                else {

                    var map_url = 'http://maps.google.com/maps?q=' + this.model.get('geo_location').latitude + '+' + this.model.get('geo_location').longitude + '&amp;&amp;markers=color:blue|size:mid|lable:S|' + this.model.get('geo_location').latitude + ',' + this.model.get('geo_location').longitude + '&amp;zoom=2&amp;output=embed" marginwidth="0" marginheight="0"';
//                    $div.append('<iframe width="425" scrolling="no" height="350" frameborder="0" src="' + map_url + '"></iframe><br><small><a style="color:#0000FF;text-align:left" target = "_blank" href="' + map_url + '">View Larger Map</a></small>').addClass("loaded");
                    Overlay.view(('<iframe width="425" scrolling="no" height="350" frameborder="0" src="' + map_url + '"></iframe><br><small><a style="color:#0000FF;text-align:left" target = "_blank" href="' + map_url + '">View Larger Map</a></small>'))   ;
                    return false;
                }
            },
//            search_subject_follower:function () {
//                var user = new User({
//                    id:this.params.id
//                });
//                var popup = new FindSubjectFollower({
//                    model:user,
//                    params:this.params,
//                    resultList:this.options.resultList
//                });
//                // peopleList.fetch({ data: { params:{subscriptions:"6", "set_actions":"true" } }  });
//                $(this.el).append(popup.render().el);
//                $('.q-tip', $(this.el)).qtip(this.qtipConfig($(this.el)));
//
//            },
 

            //toReview: what is   sub_subjects
            sub_subjects:function () {
                var sub_subjects = [];
                if (this.model.get("subject_children").total_entries > 1) {
                    sub_subjects = this.model.get("subject_children").subject;
                }
                else if (this.model.get("subject_children").total_entries == 1) {
                    sub_subjects.push(this.model.get("subject_children").subject);
                }
                else {
                }
                return sub_subjects;
            },
            subject_location:function () {

                var subjects = new Subjects(), model = this.model, index = 0 , $ele = this.$("#parent-list"), $ele_header = this.$("#subject_location_header");
                subjects.scopeId = this.model.id;
                this.subloc = subjects;
                subjects.load(function () {
                    var margin = 0;
                    if (subjects.length > 0) {
                        $ele_header.append('<h3>Subject Location </h3>');
                    }
                    subjects.each(function (subject) {
                        margin += 2;
                        if (index == 0) {
                            $ele.append('<li class="first"><a href="' + subject.showUrl() + '">' + subject.get("display_name") + '</a></li>');
                            index += 1;
                        }
                        else {
                            $ele.append('<li style="margin-left:' + margin + 'px "><a href="' + subject.showUrl() + '">' + subject.get("display_name") + '</a></li>');
                        }
                    });
                    margin += 2;
                    if (subjects.length > 0) {
                        $ele.append('<li style="margin-left:' + margin + 'px ">' + model.get("display_name") + '</li>');
                    }
                });
            },
            popular_subjects:function () {
                var popular_sub_collection = this.options.popular_list;//collection;
                var $ele = this.$("#popular-list-item");
                popular_sub_collection.each(function (subject) {
                    $ele.append(new PopularListItem({
                        model:subject,
                        collection:popular_sub_collection
                    }).render().el);
                });
            },
            notification:function (event) {
                var $link = $(event.target);
                if (!this.hasNotification) {
                    this.add_subject_notification();
                }
                this.$("#subject_notification").find("select").attr("disabled", true);
                $link.toggleClass('open');
                $("#owner_inner").toggle();
                return false;
            }

        });
    });




