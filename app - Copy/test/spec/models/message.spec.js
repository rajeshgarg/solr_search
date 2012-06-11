define([
    'order!underscore'
    , 'order!underscore_matchers'
    , 'models/message'
    , 'models/geo_location'
    , 'order!fixtures/messages'
]
    , function (_, _M, Message, GeoLocation, data) {
        describe("Message", function () {


            describe("initialize", function () {

                beforeEach(function () {
                    this.message = new Message(data[3]);
                    this.assetMessage = new Message(data[2]);
                    this.linkMessage = new Message(data[1]);
                })

                it("should correctly initialize all the attributes", function () {
                    expect(this.message.subjects.length).toEqual(2);
                    expect(this.assetMessage.assets.length).toEqual(1);
                    expect(this.assetMessage.links).toEqual(undefined);
                    expect(this.linkMessage.assets).toEqual(undefined);
                    expect(this.linkMessage.links.length).toEqual(1);
                });

                it("should be a collection", function () {
                    expect(this.assetMessage.assets).toRespondTo('first', "find");
                    expect(this.linkMessage.links).toRespondTo('first', "find");
                });

                it("should be a model", function () {
                    expect(this.assetMessage.assets.first()).toRespondTo('dataSet');
                    expect(this.linkMessage.links.first()).toRespondTo('dataSet');
                });

                it("should have correct baseName", function () {
                    expect(this.message.baseName).toEqual("messages")
                });

                it("should have correct url", function () {
                    expect(this.message.showUrl()).toEqual("#/messages/" + this.message.id)
                });

            });


            describe("postedTo", function () {

                beforeEach(function () {
                    this.message = new Message(data[0]);
                });

                it("should have correct subjects list", function () {
                    expect(this.message.postedTo()).toEqual([
                        { icon:'people-icon', name:'Ranu Khakurel', url:'#/subjects/27' },
                        { icon:'people-icon', name:'Suraj Khakurel', url:'#/subjects/24' }
                    ])
                })

            });

            describe("postedAt", function () {
                beforeEach(function () {
                    this.message = new Message(data[0]);
                });

//                it("should have correct posted time", function () {
//                    expect(this.message.postedAt()).toEqual("December 6th 2011, 3:59:53 pm");
//                })
            });

            describe("geoLocation", function () {

                it("should not have geo-location", function () {
                    var message = new Message(data[0]);
                    expect(message.geo_location).toBeUndefined()
                });

                it("should have geo-location", function () {
                    var msg = data[0];
                    msg.geo_location = {'json_class':'GeoLocation', 'application_name':null, 'latitude':37.409184, 'longitude':-122.149483, 'place':"3165 Porter Dr, Palo Alto, CA 94304, USA"}
                    var message = new Message(msg);

                    expect(message.geo_location).toBeAnInstanceOf(GeoLocation);
                    expect(message.geo_location.get('latitude')).toEqual(37.409184);

                })


            });


        });
    });