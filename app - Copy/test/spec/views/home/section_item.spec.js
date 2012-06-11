define(['jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/default_filter'
    , 'views/home/section_item'

]
    , function ($, J$, Tibbr, Filter, SectionItemView) {

        describe("SectionItemView", function () {

            beforeEach(function () {
                this.view = new SectionItemView({model: new Filter({type:"my_wall", name:"My Wall"})});
            });

            describe("Instantiation", function () {
                it("should create a li element", function () {
                    expect(this.view.el.nodeName).toEqual("LI");
                });


            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.view.render();
                });

                it("should have correct values", function () {
                    var view = $(this.view.el);
                    expect(view).toContain('a#filter-my_wall');
                    expect(view.find('a#filter-my_wall')).toHaveAttr('href', '#/messages/my_wall/filters');
                    expect(view.find('a#filter-my_wall')).toHaveClass('custom-filter-link');
                    expect($.trim(view.find('a#filter-my_wall').text())).toEqual('My Wall');
                    expect(view.find('a#filter-my_wall img')).toHaveAttr('src', '/images/my_streams/my_wall.gif');

                });


                it("should select the current element in the list", function () {
                    var view = $(this.view.el);
                    view.find("a").click();
                    expect(view).toHaveClass("active")
                });


            });


        });


    });