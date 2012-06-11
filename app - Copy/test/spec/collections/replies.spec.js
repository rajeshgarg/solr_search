define([
    'tibbr'
    ,'collections/replies'
    ,'models/reply'
]
    , function (Tibbr, Messages, Reply, messageData) {
        describe("Replies", function () {

            beforeEach(function () {
                this.replies = new Messages();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.replies.className).toEqual("replies");
                });
                it("should have current model", function () {
                    expect(this.replies.model).toEqual(Reply)
                });

                it("should have current tibbr url", function () {
                    expect(this.replies.tibbrURL).toEqual({action:"messages"})
                })
            });


        });
    })
