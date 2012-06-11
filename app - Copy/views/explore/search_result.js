define(["jquery"
    , "underscore"
    , "tibbr"
    , "views/subjects/all_subjects"
    , "views/common/traditional_pagination"
    , 'text!templates/explore/search_result.html'
    , 'views/messages/list_item'
    , 'views/users/all_people'
    , 'collections/users'
    , 'collections/subjects'
    , 'collections/messages'
]

, function ($, _, Tibbr, AllSubjectView, TPagination, SearchResult, ListItemView, AllPeopleView, Users, Subjects, Messages) {
        return Tibbr.SearchResultView = Tibbr.View.extend({
            tagName:"tr",
             events:{
                "click #all_post_li a":"all_posts",
                "click #messages_li a":"messages",
                "click #subjects_li a":"subjects",
                "click #people_li a":"people",
                "click #sb_form_go1":"global_submit"
            },
            global_submit:function()
            {
              var collection = new Messages(Tibbr.currentUser.search_messages(1,20,'aa', true));
              this.options.subcollection = new Subjects(Tibbr.currentUser.search_subjects(1,20,'rr', true));
              this.options.usercollection = new Users(Tibbr.currentUser.search_users(1,20,'tibbr', true));
                this.render();
                return false;
            },
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
            },
            render:function () {
                 $(this.el).html(this.template.render(SearchResult));
                 var view, collection = this.collection, $ele = this.$('#stream'),$messagePaginateDiv = this.$("#pagination_message_view");
                 var all_subject_view, all_sub_collection = this.options.subcollection, $items = this.$('#list-subjects'),$subjectPaginateDiv = this.$("#pagination_subject_view");
                 var all_people_view, all_people_collection = this.options.usercollection, $people = this.$('#list-people'),$peoplePaginateDiv = this.$("#pagination_people_view");
                 $ele.empty();$items.empty();$people.empty();

                collection.each(function (message) {
                    view = new ListItemView({
                        model:message,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                })
                //pagination
                $messagePaginateDiv.html("")
                this.pagination = this.pagination || new TPagination({
                    collection: this.collection, el:$messagePaginateDiv
                    })
                this.pagination.render();
                
               all_sub_collection.each(function (subject) {
                    all_subject_view = new AllSubjectView({
                        model:subject,
                        collection:all_sub_collection
                    });
                    $items.append(all_subject_view.render().el);
                })
                //pagination
                $subjectPaginateDiv.html("")
                this.pagination = this.pagination || new TPagination({
                    collection: this.collection, el:$subjectPaginateDiv
                    })
                this.pagination.render();

                
                all_people_collection.each(function (people) {
                    all_people_view = new AllPeopleView({
                        model:people,
                        collection:all_people_collection
                    });
                    $people.append(all_people_view.render().el);
                })
                
                //pagination
                $peoplePaginateDiv.html("")
                this.pagination = this.pagination || new TPagination({
                    collection: this.all_people_collection, el:$peoplePaginateDiv
                    })
                this.pagination.render();

                return this;
            },
             all_posts:function (event) {
                this.$("#subjects_li a").removeClass('active');
                this.$("#messages_li a").removeClass('active');
                this.$("#people_li a").removeClass('active');
                this.$("#all_post_li a").addClass('active');
                this.$("#message-results").show();
                this.$("#subject-results").show();
                this.$("#people-results").show();
                return false;
            },
            messages:function (event) {
                this.$("#all_post_li a").removeClass('active');
                this.$("#subjects_li a").removeClass('active');
                this.$("#people_li a").removeClass('active');
                this.$("#messages_li a").addClass('active');
                this.$("#message-results").show();
                this.$("#subject-results").hide();
                this.$("#people-results").hide();
                return false;
            },
            subjects:function (event) {
                this.$("#all_post_li a").removeClass('active');
                this.$("#messages_li a").removeClass('active');
                this.$("#people_li a").removeClass('active');
                this.$("#subjects_li a").addClass('active');
                this.$("#message-results").hide();
                this.$("#subject-results").show();
                this.$("#people-results").hide();
                return false;
            },
            people:function (event) {
                this.$("#all_post_li a").removeClass('active');
                this.$("#subjects_li a").removeClass('active');
                this.$("#messages_li a").removeClass('active');
                this.$("#people_li a").addClass('active');
                this.$("#message-results").hide();
                this.$("#subject-results").hide();
                this.$("#people-results").show();
                return false;
            }

        });
    });