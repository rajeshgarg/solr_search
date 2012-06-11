define(["jquery"
    , "underscore"
    , "tibbr"
    , 'controllers/application'
    , 'text!templates/users/profile.html'
    , 'views/common/follow_button'
    , 'collections/all_messages'
    , 'views/messages/list'
    , 'views/users/about'
]
    , function ($, _, Tibbr, Application, profile,FollowButtonView, AllMessages, MessageListView, AboutView) {
        return Tibbr.ProfileView = Tibbr.View.extend({
            className:"profile-wrap",
            initialize:function () {
                _.bindAll(this, 'render');
                this.model.bind('change', this.render);
            },
            render:function () {
                $(this.el).html(this.template.render(profile, {model:this.model}));
                var followButtonView = new FollowButtonView({model: this.model});
                    this.$('.action-button').append(followButtonView.render().el);

                // Following is to display other user's posted messages
                var messages = new AllMessages();
                messages.scopeId = this.model.id;
                messages.fetch({data:{params:{set_actions:true, per_page:10, user_id:this.model.id}} })
                var messageListView = new MessageListView({collection:messages}).render().el;
                Application.wallTabView.add({title: this.t('user.own_post', this.model.get('first_name')), content: messageListView, close: false});

                // Following is to display other user's profile
                var aboutView = new AboutView({model:this.model}).render().el;
                Application.wallTabView.add({title: this.t('user.about'), content: aboutView, close: false});
                return this;
            }
        });
    });