define([
    'tibbr',
    'collections/users',
    'models/user',
    'fixtures/users'
]
    , function (Tibbr, Users, User, userData) {
        describe("Idols", function () {
            beforeEach(function () {
                this.users = new Users();
            });
            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.users.className).toEqual("users");
                });
                it("should have current model", function () {
                    expect(this.users.model).toEqual(User)
                })
            });

        });
    });
