define(['jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'controllers/application'
    , 'collections/messages'
    , 'collections/private_messages'
    , 'collections/chat_messages'
    , 'collections/star_messages'
    , 'collections/question_messages'
    , 'collections/all_messages'
    , 'collections/message_search'
    , 'views/messages/list'
    , 'models/message'
    , 'views/messages/list_item'
],
    function ($, _, Backbone, Tibbr, Application, Messages, PrivateMessages, ChatMessages, StarMessages, QuestionMessages, AllMessages, MessageSearch, MessageListView, Message, MessageView) {
        return  Tibbr.Controller.extend({
            show:function () {
                Application.initWall(Tibbr.translate("message.message"));
                Application.leftNavigation(Tibbr.currentUser, false);
                new Message({id:this.params.id}).fetch({success:function (model, data) {
                    $("div.tibbit_div").html(new MessageView({model:new Message(data)}).render().el)
                }});

            },
            filters:function () {
                Application.setWallAndPost(Tibbr.currentUser, true);

                var collection, text;
                switch (this.params.id || "all_post") {
                    case "private":
                        collection = new PrivateMessages();
                        break;
                    case "chat":
                        collection = new ChatMessages();
                        break;
                    case "star":
                        collection = new StarMessages();
                        break;
                    case "question":
                        collection = new QuestionMessages();
                        break;
                    case "all_post":
                        collection = new AllMessages();
                        break;
                    case "my_wall":
                        collection = new Messages();
                        break;
                    default:
                        if (!_.isNaN(parseInt(this.params.id))) {
                            collection = new MessageSearch()
                        } else {
                            collection = new Messages();
                            var that = this, types = [],
                                currentStream = Tibbr.serverStreams.detect(function (stream) {
                                    if (stream.get('type') === that.params.id) return stream;
                                });
                            collection.type = currentStream.get('mtypes');
                            types = _.clone(currentStream.get('message_filters'));
                            if (!_.isEmpty(types)) {
                                text = types[0].name;
                                types.splice(0, 1);
                                types = _.collect(types, function (type) {

                                    var messages = new MessageSearch(), messageList = new MessageListView({collection:messages}).render().el;
                                    messages.scopeId = Tibbr.currentUser.id;

                                    messages.load(type.id);
                                    return {name:type.name, content:messageList};
                                });

                                if (types.length > 0) {
                                    Application.wallTabView.addEvents(types);
                                }

                            }


                        }

                }
                collection.scopeId = Tibbr.currentUser.id;
                $("div.tibbit_div").html(new MessageListView({collection:collection, type:this.params.id}).render().el);
                this.event.trigger("section:change", this.params.id, text);
                collection.load(this.params.id)
            }

        })
    });
