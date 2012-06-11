define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/user'
    , 'views/users/edit'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, User, EditView, userData) {
        describe("UserEditProfile", function () {

            beforeEach(function () {
                var user = new User(userData[0]);
                var metaDetails = [
                    {"key":"first_name", "label":"First Name", "position":3.1, "type":"string", "ui_type":"text_field", "required":true, "multi_value":false, "editable":true},
                    {"key":"last_name", "label":"LastName", "position":3.2, "type":"string", "ui_type":"text_field", "required":true, "multi_value":false, "editable":true},
                    {"key":"email", "label":"Email", "position":3.3, "type":"string", "ui_type":"text_field", "required":true, "multi_value":false, "editable":true}
                ]
                this.view = new EditView({model:user, meta_details:metaDetails});
            });

            describe("Instantiation", function () {
                it("should have a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV")
                });

                it("should have class name profile-wrap ", function () {
                    expect($(this.view.el)).toHaveClass("profile-wrap");
                })

            });

            describe("Rendering", function () {
                beforeEach(function () {
                    this.html = $(this.view.render().el);
                })

                it("should have a form ", function () {
                    expect(this.html).toContain("form");
                });

                it("should have a current action url in form", function () {
                    expect(this.html.find("form")).toHaveAttr("action", "/users/" + this.view.model.id);
                });

                it("should have a iframe", function () {
                    expect(this.html).toContain("iframe");
                });


                describe("edit-profile-details", function () {
                    it("should be empty", function () {
                        expect(this.html.find('#edit-profile-details').find("li").length).toEqual(0);
                    });
                })


            });


//
//            describe("Instantiation", function () {
//
//                it("should have a div element", function () {
//                    expect(this.view.el.nodeName).toEqual("DIV");
//                });
//                it("should have a class of 'flash'", function () {
//                    expect($(this.view.el)).toHaveClass('flash');
//                });
//
//            });
//
//            describe("Rendering", function () {
//
//                beforeEach(function () {
//                    this.html = $(this.view.render().el)
//                });
//
//                it("should have correct header", function(){
////                    expect(this.html).toContain("a.profile-pic")
//                    expect(this.html.find('h3')).toHaveText("Recently Created Subjects");
//                    expect(this.html.find('#recommendations > li').length).toEqual(2);
//                });
//                it("should display see more", function(){
//
//                })
//
//            });
        });

    });
