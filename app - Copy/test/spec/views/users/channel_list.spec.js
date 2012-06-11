define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/user'
    , 'collections/channels'
    , 'views/users/channel_list'
    , 'fixtures/channels'
]
    , function ($, J$, Tibbr, User, Channels, ChannelListView, fixture) {

        describe("ChannelListView", function () {

            beforeEach(function () {
                this.view = new ChannelListView({header:"Channel", collection:new Channels(fixture)});
            });

            describe("Instantiation", function () {

                it("should have a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                });
                it("should have a id of 'main-content'", function () {
                    expect($(this.view.el)).toHaveId('main-content');
                });

            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.html = $(this.view.render().el)
                });

                it("should have correct h5", function(){
                    expect(this.html.find('h5')).toHaveText("Email");
                });
                it("should have same number of div as the data", function(){
                    expect(this.html.find('.wrap > div').length).toEqual(fixture.length);
                });

            });
        });
    });