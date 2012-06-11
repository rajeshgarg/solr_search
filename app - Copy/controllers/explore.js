define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'models/user'
    , 'models/subject'
    , "controllers/application"
    , "collections/subjects"
    , "collections/subjects_search"
    , "collections/users_search"
    , "collections/idols"
    , "collections/followers"
    , "views/explore/layout"
    , "views/explore/list_view"
    , 'views/home/profile_section'
    , 'views/explore/search_result'
    , "views/explore/people_list"
    , "views/explore/my_people_list"
    , 'collections/all_messages'
    ,"models/hierarchy_node"
    ,"views/explore/people_hierarchy"
    ,"views/common/tabs"
],

    function ($, _, Backbone, Tibbr, User, Subject, Application, Subjects, SubjectsSearch, UserSearch, Idols, Followers,  Layout, ResultList, ProfileView, SearchResultView, PeopleList, MyPeopleList, AllMessages,UserHierarchyNode, UserHierarchyView, TabsView) {
        return  Tibbr.Controller.extend({
            people_directory:function () {
                Application.leftNavigation(Tibbr.currentUser, false);
                var user = new User({id:this.params.id }), profileView = new ProfileView({model:Tibbr.currentUser}) , peopleList = new UserSearch(), self = this, userId = this.params["user_id"] || Tibbr.currentUser.get("id"), view = new Layout({model: user, params: this.params , resultList: peopleList });
                $("#main-sidebar").html(profileView.render().el);
                userId = this.params.user_id
                peopleList.scopeId = Tibbr.currentUser.id;
                this.setTabs(1)
                $('#tab-content').html(view.render().el)
                if(this.params["type"]=="hierarchy")
                view.switchSubTab("hierarchy",function(){ self.people_hiearchy_view(userId);})
               else
                view.switchSubTab("list",function(){ self.people_list_view(peopleList); })
            
            },
            my_people:function () {
                Application.leftNavigation(Tibbr.currentUser, false);
                   this.setTabs(0)
                var followers = new UserSearch(), idols = new UserSearch();
                followers.scopeId = idols.scopeId = Tibbr.currentUser.get("id");
                var view = new PeopleList({idols: idols , followers: followers,  params: this.params});
                followers.paginate({params:{following: Tibbr.currentUser.id, set_actions: true}})
                idols.paginate({params:{followers: Tibbr.currentUser.id, set_actions: true }})
                $('#tab-content').html(view.render().el);
            },
            search:function () {
                var view = new ProfileView({model:Tibbr.currentUser});
                $("#main-sidebar").html(view.render().el);

                //subject list
                var subjectCollection  = new SubjectsSearch();
                subjectCollection.scopeId=Tibbr.currentUser.id;
                subjectCollection.fetch();

                //people list
                var usersList = new UserSearch();
                usersList.scopeId = Tibbr.currentUser.id;
                usersList.fetch();

                //messgae list
                var collection = new  AllMessages();
                var user = new User({id:Tibbr.currentUser.id});
                collection.scopeId = Tibbr.currentUser.id;
                user.fetch();
                var msgView = new SearchResultView({model:user,collection:collection,subcollection:subjectCollection,usercollection:usersList});
                collection.load();
                $('#content').html(msgView.render().el);
        },
         people_hiearchy_view: function(userId){
            $("#company-hierarchy").html();
            var root = new UserHierarchyNode({id:userId,isRootNode: true,targetUserId: userId, isLast:false})
            root.fetch({success:function(){
                      root.trigger("updateSubordinates");
                      $("#company-hierarchy").html(new UserHierarchyView({model: root,isLast:false}).render().el)
            }});
         },
         people_list_view: function(peopleList){
             new ResultList({collection:peopleList,model:User, modelType: "user"})
             peopleList.setParams({params:{starts_with_first_name: this.params.s_with, set_actions: true}})
             peopleList.paginate();
         },
          setTabs:function (activeIndex) {
                if ($('#content .tabs').length == 0) {
                    var tabSetting = {
                        activeIndex:activeIndex,
                        tabs:[
                            {
                                name:"My People",
                                url: Tibbr.url("explore/my_people")
                            },
                            {
                                name:"Directory",
                                url:Tibbr.url("explore/people_directory")
                            }
                        ]
                    };
                    $("#content").html(new TabsView({settings:tabSetting}).render().el);
                }

            }
        })
    });