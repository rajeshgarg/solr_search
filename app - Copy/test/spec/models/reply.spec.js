define([
    'order!underscore'
    , 'order!underscore_matchers'
    , 'order!models/reply'
    , 'order!fixtures/messages'
]
    , function (_, _M, Reply, data) {
        describe("Message", function () {


            describe("initialize", function () {

                beforeEach(function () {
                    var message = data[4].messages;
                    this.reply = new Reply(message[2]);
                    this.assetReply = new Reply(message[1]);
                    this.linkReply = new Reply(message[0]);
                })

                it("should correctly initialize all the attributes", function () {
                    expect(this.assetReply.assets.length).toEqual(1);
                    expect(this.assetReply.links).toEqual(undefined);
                    expect(this.linkReply.assets).toEqual(undefined);
                    expect(this.linkReply.links.length).toEqual(1);
                });

                it("should be a collection", function () {
                    expect(this.assetReply.assets).toRespondTo('first', "find");
                    expect(this.linkReply.links).toRespondTo('first', "find");
                });

                it("should be a model", function () {
                    expect(this.assetReply.assets.first()).toRespondTo('dataSet');
                    expect(this.linkReply.links.first()).toRespondTo('dataSet');
                });
            });

            describe("postedAt", function () {
                beforeEach(function () {
                    this.reply = new Reply(data[4].messages[2]);
                });

                it("should have correct posted time", function () {
                    expect(this.reply.postedAt()).toEqual("January 1st 2012, 8:09:03 pm");
                })
            })


        });
    });