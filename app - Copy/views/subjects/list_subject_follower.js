define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/explore/list_item'
    , 'views/common/traditional_pagination'
    , 'text!templates/subjects/list_subject_follower.html'
    , 'views/common/follow_button'
    ],

    function ($, _, Tibbr, ListItem,TPagination,ListSubjectFollower,FollowButtonView) {
        return  Tibbr.UserBoxListView = Tibbr.View.extend({
            initialize: function(){
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                this.pagination = null;
            },
            render: function(){
                $(this.el).html(this.template.render(ListSubjectFollower,{collection:this.collection}));
                var collection = this.collection, $follow = this.$('.action-button'),$ele = this.$("#list-items"),$paginateDiv = this.$("#pagination_list_view");
                collection.each(function (user) {
                    var view = new ListItem({
                        model:user
                    });
                    $ele.append(view.render().el);
//                    $ele.append(view.renderUserList().el);
                });
                var followButtonView = new FollowButtonView({model: this.model});

                $follow.append(followButtonView.render().el);
                $paginateDiv.html("")
                this.pagination = this.pagination || new TPagination({
                    collection: this.collection, el:$paginateDiv
                    })
                this.pagination.render();
                return this;
            }
        });
    });