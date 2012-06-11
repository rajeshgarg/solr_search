define(['jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/user'
    , 'views/home/left_nav'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, User, leftNavView, userData) {

        describe("LetNavView", function () {

            beforeEach(function () {
                this.user = new User(userData[0]);
                this.view = new leftNavView({model:this.user});
            });

            describe("Instantiation", function () {

                it("should create a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                });

                it("should have a class of 'profile-section'", function () {
                    expect($(this.view.el)).toHaveClass('padding-wrap');
                });

            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.view.render();
                });

                it("should have correct values", function () {
                    expect($(this.view.el)).toContain('div#profile');
                });

            });


        });


    });