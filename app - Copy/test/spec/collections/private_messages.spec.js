define([
    'tibbr'
    , 'collections/private_messages'
    , 'models/message'
    , 'fixtures/messages'
]
    , function (Tibbr, Messages, Message, messageData) {
        describe("Private Messages", function () {

            beforeEach(function () {
                this.messages = new Messages();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.messages.className).toEqual("private_messages");
                });
                it("should have current model", function () {
                    expect(this.messages.model).toEqual(Message)
                });

                it("should have current tibbr url", function () {
                    expect(this.messages.tibbrURL).toEqual({controller:"users", action:"private_messages"})
                })
            });


        });
    });
