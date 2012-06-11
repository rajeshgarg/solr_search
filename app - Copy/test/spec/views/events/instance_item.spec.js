define([
    'jquery'
    , 'jasmin_jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/application_instance'
    , 'views/events/instance_item'
    , 'fixtures/application_instances'
]
    , function ($, J$, _, Tibbr, Instance, InstanceView, data) {

        describe("ApplicationInstanceItemView", function () {

            beforeEach(function () {
                this.view = new InstanceView({model:new Instance(data[0]), definition:{}});
            });

            describe("Instantiation", function () {

                it("should have a li element", function () {
                    expect(this.view.el.nodeName).toEqual("LI");
                });

            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.html = $(this.view.render().el)
                });

                it("should have correct header", function () {
                    expect(this.html.find(".channel-name")).toHaveText(data[0].name);
                    expect(this.html.find(".feed-status")).toHaveText(_.titleize(data[0].status));
                });

                it("should have correct status title", function () {
                    expect(this.html.find(".statistic")).toHaveAttr("title", "You have disabled this instance.");
                });

                it("should not have show-stream", function () {
                    expect(this.html).not.toContain("view-stream");
                })

//                it("should  have show-stream", function(){
                //todo: need to spy
//                    expect(this.html).toContain("view-stream");
//                })


            });
        });
    });