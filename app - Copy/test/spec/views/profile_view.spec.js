define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/user'
    , 'views/users/profile'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, User, ProfileView, userData) {

        describe("ProfileView", function () {

            beforeEach(function () {
                this.view = new ProfileView({model:new User(userData[0])});
            });

            describe("Instantiation", function () {

                it("should create a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                });

                it("should have a class of 'profile-wrap'", function () {
                    expect($(this.view.el)).toHaveClass('profile-wrap');
                });


            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.view.render();
                });

                it("should have correct values", function () {
                    var view = $(this.view.el);
                    expect(view).toContain('div.profile');
                    expect(view.find('a.display-name')).toHaveText('Suraj Khakurel');
                    expect(view.find('a.email')).toHaveText('suraj@khakurel.net');
                    expect(view.find('dd.department')).toHaveText('Engineering');
                    expect(view.find('dd.company')).toHaveText('TIBCO INC');
                    expect(view).not.toContain('dd.phone');
                    expect(view).not.toContain('dd.office');
                    expect(view).not.toContain('dd.mobile');
                    expect(view).not.toContain('dd.location');
                });

                it("should have correct label", function () {
                    var view = $(this.view.el), dt = view.find('dt');
                    expect(dt.first()).toHaveText('Name:');
                    expect(dt.eq(1)).toHaveText('Email:');
                    expect(dt.eq(2)).toHaveText('Department:');
                    expect(dt.eq(3)).toHaveText('Company:');
                });

            });


        });


    });