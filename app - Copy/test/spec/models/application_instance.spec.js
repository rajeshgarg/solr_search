define([
    'order!underscore'
    , 'order!underscore_matchers'
    , 'order!models/application_instance'
    , 'order!fixtures/application_instances'
]
    , function (_, _M, Instance, data) {
        describe("ApplicationInstances", function () {

            beforeEach(function () {
                this.instance = new Instance(data[0])

            });


            describe("initialize", function () {
                it("should have correct baseName", function () {
                    expect(this.instance.baseName).toEqual("application_instances");
                });

                it("should have correct modelType", function () {
                    expect(this.instance.get("modelType")).toEqual("ApplicationInstance")
                });


            });

            describe("status", function(){
                it("should have correct status", function(){
                    expect(this.instance.status()).toEqual("Disabled")
                })
            });

            describe("statistic", function(){
                it("should have correct statistic", function(){
                    expect(this.instance.statistic()).toEqual("disabled")
                })
            });




        });
    });