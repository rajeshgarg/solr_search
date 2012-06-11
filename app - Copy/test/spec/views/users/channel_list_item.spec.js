define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/user'
    , 'views/users/channel_list_item'
    , 'fixtures/channels'
]
    , function ($, J$, Tibbr, User, ChannelListItemView, fixture) {

        describe("ChannelLisItemtView", function () {

            beforeEach(function () {
                this.view = new ChannelListItemView({model:new User(fixture)});
            });

            describe("Instantiation", function () {
                it("should create a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                });
            });
        });
    });