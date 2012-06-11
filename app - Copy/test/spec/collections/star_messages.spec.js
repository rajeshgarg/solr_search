define([
    'tibbr'
    , 'collections/star_messages'
    , 'models/message'
    , 'fixtures/messages'
]
    , function (Tibbr, Messages, Message, messageData) {
        describe("Star Messages", function () {

            beforeEach(function () {
                this.messages = new Messages();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.messages.className).toEqual("starred_messages");
                });
                it("should have current model", function () {
                    expect(this.messages.model).toEqual(Message)
                });

                it("should have current tibbr url", function () {
                    expect(this.messages.tibbrURL).toEqual({controller:"users", action:"starred_messages"})
                })
            });


        });
    });
