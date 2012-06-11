//Simple helper methods for controller
define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'views/home/left_nav'
    , 'views/common/post'
    , 'views/common/wall_tab'
    , 'views/common/global_search'
],
    function ($, _, Backbone, Tibbr, LeftNavView, PostView, WallTabView, GlobalSearchView) {
        return   {
            /**
             * use for display the home page left naivation
             * @param user  User
             */
            leftNavigation:function (user, homePage) {
                this.setGlobalSearch();
                var view = new LeftNavView({
                    model:user,
                    homePage:homePage // require true for home page only
                });
                $("#main-sidebar").html(view.render().el);
            },
            /**
             * Help to display Post Box
             */
            setPost:function () {
                this.postBoxView = new PostView({});
                $("#content").html(this.postBoxView.render().el);
                this.postBoxView.display()
            },
            /**
             * set wall tab view to content
             */
            initWall:function (wallName) {
               this.wallTabView = new WallTabView({name:wallName}).render();
            },
            setWallAndPost:function (user, homePage) {
                this.setPost(); //it should be first
                this.initWall();
                this.leftNavigation(Tibbr.currentUser, homePage);

            },
            setMySubjectWallPost:function () {
                this.setPost();
            },
            myPosts:function () {
                this.initWall();
            },
            setGlobalSearch:function () {
                if ($("div#global-search").length === 0) {
                    $('#header .wrap').prepend(new GlobalSearchView().render().el);
                }
            },
            setProfileWallPost:function(user) {
                this.setPost();
                var wallName = Tibbr.translate("user.wall", user.get('first_name'))
                this.initWall(wallName);
            }

        }
    });