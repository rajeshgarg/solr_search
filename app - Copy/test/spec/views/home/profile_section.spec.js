define(['jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/user'
    , 'views/home/profile_section'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, User, ProfileSectionView, userData) {

        describe("ProfileView", function () {

            beforeEach(function () {
                this.user = new User(userData[0]);
                this.user.dataSet.set({id:"followers", data:{"type":"collection", "current_page":1, "per_page":30, "total_entries":5, "total_pages":1, "items":[]}, scope:this.user.id});
                this.user.dataSet.set({id:"idols", data:{"type":"collection", "current_page":1, "per_page":30, "total_entries":4, "total_pages":1, "items":[]}, scope:this.user.id});
                this.view = new ProfileSectionView({model:this.user});
            });

            describe("Instantiation", function () {
                it("should create a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                });
                it("should have a class of 'profile-section'", function () {
                    expect($(this.view.el)).toHaveClass('profile-section');
                });

            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.view.render();
                });

                it("should have correct values", function () {
                    var view = $(this.view.el);
                    expect(view).toContain('div#profile');
                    expect(view.find('a.profile-pic')).toHaveAttr('href', '#/users/2');
                    expect(view.find('a.profile-edit-link')).toHaveAttr('href', '#/users/2/edit');
                    expect(view.find('li.followers').find("span")).toHaveText("5");
                    expect(view.find('li.following').find("span")).toHaveText("4");

                });

            });


        });


    });