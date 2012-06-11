define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/subject'
    , 'views/subjects/popular_list_item'
    , 'fixtures/subjects'
]
    , function ($, J$, Tibbr, Subject, PopularListView, fixture) {

        describe("PopularSubjectListView", function () {

            beforeEach(function () {
                this.view = new PopularListView({model:new Subject(fixture[0])});
            });

            describe("Instantiation", function () {

                it("should create a li element", function () {
                    expect(this.view.el.nodeName).toEqual("LI");
                });
            });
        });
    });