define([
    'jquery'
    , 'jasmin_jquery'
    ,  'underscore'
    , 'tibbr'
    , 'collections/application_instances'
    , 'views/events/instance_list'
    , 'fixtures/application_instances'
]
    , function ($, J$, _, Tibbr, Instances, InstanceListView, data) {

        describe("ApplicationInstanceListView", function () {

            beforeEach(function () {
                this.view = new InstanceListView({collection:new Instances(data), "definition": {name: "x"} });
            });

            describe("Instantiation", function () {

                it("should have a UL element", function () {
                    expect(this.view.el.nodeName).toEqual("UL");
                });

                it("should have  header ", function () {
                    var html = $(this.view.el);
                    expect(html.find("li.heading")).toBeTruthy();
                });

            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.html = $(this.view.render().el)
                });

                it("should have  instances", function () {
                    expect(this.html.find('> li').not("li.heading").length).toEqual(data.length)
                });

                it("should have correct values for the instance", function () {
                    var li = this.html.find('> li').not("li.heading").eq(1);
                    expect(li).toContain(".channel-description");
                    expect(li.find(".channel-name")).toHaveText(data[1].name);
                    expect(li.find(".feed-status")).toHaveText(_.titleize(data[1].status));
                });


            });
        });
    });