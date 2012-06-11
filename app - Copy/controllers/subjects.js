define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'controllers/application'
    , 'models/user'
    , 'models/subject'
    , "collections/subjects"
    , "collections/subjects_search"
    , "collections/subject_messages"
    , "collections/recent_subjects"
    , "collections/popular_subjects"
    , 'collections/my_subjects'
    , 'collections/subjects_hierarchy'
    , "collections/subject_announcement"
    , 'views/subjects/hierarchy'
    , 'views/common/subject_tab'
    , 'views/subjects/subject_layout'
    , 'views/subjects/subject_left_nav'
    , 'views/subjects/subject_follower'
    , 'views/subjects/subject_recent_list'
    , "collections/subjects_hierarchy_child"
    , "views/subjects/sub_subject"
    , "views/common/tabs"
    , "collections/users_search"
    , "views/subjects/find_subject_follower"
    , "views/explore/list_view"
    , 'collections/channels'
    , 'views/subjects/new_edit_form'
    , 'views/messages/list'
    , 'collections/subject_questions'
    , 'views/subjects/right_side_nav'
    , "views/pages/manage_page_link"
    , "collections/pages"
    , 'views/charts/line'
    , 'views/subjects/trends'
    , 'views/subjects/trends_analytics'
    , 'views/announcements/announcement_list'
],
    function ($, _, Backbone, Tibbr, Application, User, Subject, Subjects, SubjectsSearch, SubjectMessages, Recent_Subjects, Popular_Subjects, MySubjects, SubjectHierarchy,SubjectAnnouncements, DirectoryView, SubjectTabView, SubjectLayout, SubjectLeftNavView, SubjectFollowerView, SubjectRecentView, SubSubject, SubSubjectView, TabsView, UserSearch, FindSubjectFollower, ResultList, Channels, NewEditFormView, MessageList, Questions, RightSideNavView, ManagePageLink, Pages, LineChartView, TrendsView, TrendsAnalyticsView, AnnouncementListView) {
        return  Tibbr.Controller.extend({
            index:function () {
                Application.leftNavigation(Tibbr.currentUser, false);
                this.directory();
            },
            /**  subjectleftnav
             *  used for left navigation ofr subject profile.
             *  channel used for user notification for a subject)
             */
            show:function () {
                Application.setPost();
                Application.initWall(Tibbr.translate('subject.wall'));
                //loading subject first
                var that = this , subject = new Subject({id:that.params.id});
                this.subjectAnnouncement(subject.id);
                subject.fetch({ data:{params:{profile:"complete", set_action:true}}, success:function (model, data) {
                    Application.postBoxView.trigger("subject.name:change", {name:data.display_name, value:data.name}); // set subject name to the box
                    //loading subject left navigation

                    var channels = new Channels();
                    channels.scopeId = Tibbr.currentUser.id;
                    channels.fetch();
                    var view = new SubjectLeftNavView({ model:subject, channels:channels });
                    $("#main-sidebar").html(view.render().el);
//                    that.trends(subject);
                    //loading subject Wall
                    var collection = new SubjectMessages();
                    collection.scopeId = Tibbr.currentUser.id;
                    $("div.tibbit_div").html(new MessageList({collection:collection}).render().el);
                    collection.load(that.params.id);


                    //loading right nav
                    var rightSideNavView = new RightSideNavView({model:subject});
                    $('#sidebar').html(rightSideNavView.render().el);
                }
                });

                this.managePagesLink();
                this.pagesTabs();
            },
            my_subjects:function () {
                Application.leftNavigation(Tibbr.currentUser, false);
                this.setTabs(0);
                var collection = new SubjectsSearch();
                collection.scopeId = Tibbr.currentUser.id;
//                collection.paginate({params:{include_self:true,inherited:false,page:(this.current_page || 0) + 1, set_actions:true, per_page:30, search_str:"", user_id:Tibbr.currentUser.id}});
//                var list = new SubjectLayout({collection:collection});
//                $('#tab-content').html(list.render().el);
                collection.fetch({success:function () {
                    var list = new SubjectLayout({collection:collection});
                    $('#tab-content').html(list.render().el);
                }, data:{params:{include_self:true, inherited:false, page:1, set_actions:true, per_page:30, search_str:"", user_id:Tibbr.currentUser.id}}});
            },
            directory:function () {
                Application.leftNavigation(Tibbr.currentUser, false);
                var collection = new SubjectHierarchy();
                this.setTabs(1); //Passing the index of the tab to be set active
                collection.load(function () {
                    var directory = new DirectoryView({collection:collection});
                    $('#tab-content').html(directory.render().el);
                });

            },
            subjectLinks:function () {
                var subject_id = this.params.id;
                var subject = new Subject({id:subject_id});  //new Subject({id:this.params.id});

                var links = new Links();
                links.scopeId = Tibbr.currentUser.id;
                links.fetch({data:{params:{subject_id:subject_id, set_actions:true, per_page:5, set_action:true}}});

                var view = new SubjectLinkView({model:subject, collection:links});
                $("#sidebar").html(view.render().el);
            },
            managePagesLink:function () {
                var subject_id = this.params.id;
                var subject = new Subject({id:subject_id});
                var view = new ManagePageLink({
                    model:subject
                });
                $('#wall-tabs').find('ul').append(view.render().el);

            },
            pagesTabs:function () {
//                this.dataSet.get("pages", Tibbr.currentUser.id).items
                var subject_id = this.params.id;
                var pages = new Pages();
                pages.load(subject_id);
                pages.each(function (page) {
                    Application.wallTabView.addWithIframe({title:page.get('name'), src:page.get('url'), height:1300, close:false});
                });
            },
            recent_subjects:function () {
                var collection = new Recent_Subjects();
                var list = new SubjectRecentView({collection:collection });
                collection.fetch({data:{params:{per_page:10}}});
                $('#content').html(list.render().el);
            },
            'new':function () {
                this.setTabs(2);
                var newSubjectForm = new NewEditFormView({});
                $("#tab-content").html(newSubjectForm.render().el);

            },
            edit:function () {
                $("#content").html("edit the subject")
            },
            setTabs:function (activeIndex) {
                var tabSetting = {
                    activeIndex:activeIndex,
                    tabs:[
                        {
                            name:"My Subjects",
                            url:Tibbr.url("subjects/my_subjects")
                        },
                        {
                            name:"Directory",
                            url:Tibbr.url("subjects/directory")
                        }
                    ]
                };
                if (activeIndex === 2) { //To add subject creation tab
                    tabSetting.tabs.push(
                        {
                            name:"Create Subject",
                            url:Tibbr.url("subjects/new")
                        });
                }
                $('#content').html(new TabsView({settings:tabSetting}).render().el);


            },
            trends:function (subject) {
                var trends = new TrendsView({model:subject});
                $(".statistics").append(trends.render().el);
                trends.renderLine();
            },
            subjectAnnouncement:function(subject_id){
                console.log("in side");
                var subject_collection = new SubjectAnnouncements();
                subject_collection.scopeId = Tibbr.currentUser.id;
                subject_collection.fetch({data:{params:{subject_id:subject_id,page:1,per_page:999,set_actions:true}},
                     success:function () {
                        var announcementListView = new AnnouncementListView({collection:subject_collection});
                        $('#posting-tab-wrap').after(announcementListView.render().el);
                     }
                });
            },
            analytics: function(){
                var subject_id = this.params.id;
                var subject = new Subject({id:subject_id});
                subject.fetch({data:{params:{profile:"complete", set_action:true}}, success: function(){
                    var trends = new TrendsAnalyticsView({model:subject});
                    $("#content").append(trends.render().el);
                    trends.renderBar();
                    trends.renderLine();
                }})

            }

        })
    });
