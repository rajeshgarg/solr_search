define(['tibbr'
    , 'collections/followers'
    , 'models/user'
    , 'fixtures/users'
]
    , function (Tibbr, Followers, User, userData) {
        describe("Follower", function () {
            beforeEach(function () {
                this.followers = new Followers();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.followers.className).toEqual("followers");
                });
                it("should have correct model", function () {
                    expect(this.followers.model).toEqual(User);
                });
            });


            describe("url", function () {

                it("should have correct  tibbr url", function () {
                    expect(this.followers.tibbrURL).toEqual({ controller:'users', action:'followers' })
                });
                it("should have correct  url", function () {
                    this.followers.scopeId = 2;
                    expect(this.followers.url()).toEqual("/users/2/followers")
                });
                it("should have correct  url when current user", function () {
                    Tibbr.currentUser = new User(userData[0]);
                    this.followers.scopeId = Tibbr.currentUser.id;
                    expect(this.followers.url()).toEqual("/users/2/followers")
                })
            })

        });
    });
