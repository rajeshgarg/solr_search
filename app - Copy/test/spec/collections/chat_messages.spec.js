define([
    'tibbr'
    , 'collections/chat_messages'
    , 'models/message'
    , 'models/user'
    , 'fixtures/messages'
]
    , function (Tibbr, Messages, Message, User, messageData) {
        describe("Chat Messages", function () {

            beforeEach(function () {
                this.messages = new Messages();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.messages.className).toEqual("chat_messages");
                });
                it("should have current model", function () {
                    expect(this.messages.model).toEqual(Message)
                });

                it("should have current tibbr url", function () {
                    expect(this.messages.tibbrURL).toEqual({controller:"users", action:"subject_messages"})
                })
            });

            describe("#subjectId", function () {
               it("should give the current user login", function(){
                   Tibbr.currentUser = new User({login: "surajk"});
                   expect(this.messages.subjectId()).toEqual("surajk.c");
               })
            });


        });
    });
