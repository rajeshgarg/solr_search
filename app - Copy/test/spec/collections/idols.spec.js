define([
    'tibbr'
    , 'collections/idols'
    , 'models/user'
    , 'fixtures/users'
]
    , function (Tibbr, Idols, User, userData) {
        describe("Idols", function () {
            beforeEach(function () {
                this.idols = new Idols();
            });
            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.idols.className).toEqual("idols");
                });
                it("should have current model", function () {
                    expect(this.idols.model).toEqual(User)
                })
            });


            describe("url", function () {

                it("should have correct  tibbr url", function () {
                    this.idols.scopeId = 2
                    expect(this.idols.tibbrURL).toEqual({ controller:'users', action:'idols' });
                });
                it("should have correct  url", function () {
                    this.idols.scopeId = 2
                    expect(this.idols.url()).toEqual("/users/2/idols");
                });
                it("should have correct  url when current user", function () {
                    Tibbr.currentUser = new User(userData[0]);
                    this.idols.scopeId = Tibbr.currentUser.id;
                    expect(this.idols.url()).toEqual("/users/2/idols");
                })
            })

        });
    });
