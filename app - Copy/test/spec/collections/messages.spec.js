define([
    'tibbr'
    ,'collections/messages'
    ,'models/message'
    ,'fixtures/messages'
]
    , function (Tibbr, Messages, Message, messageData) {
        describe("Messages", function () {

            beforeEach(function () {
                this.messages = new Messages();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.messages.className).toEqual("messages");
                });
                it("should have current model", function () {
                    expect(this.messages.model).toEqual(Message)
                });

                it("should have current tibbr url", function () {
                    expect(this.messages.tibbrURL).toEqual({controller:"users", action:"messages"})
                })
            });


        });
    })
