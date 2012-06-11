define(['tibbr'], function (Tibbr) {
    describe("Tibbr", function () {

        describe("url", function () {

            it("should return valid url when history.pushState is true", function () {
                sinon.stub(Tibbr, "pushState").returns(true);
                expect(Tibbr.url("users")).toEqual("/users")
                Tibbr.pushState.restore()
            });
            it("should return valid url when history.pushState is false", function () {
                sinon.stub(Tibbr, "pushState").returns(false);
                expect(Tibbr.url("users")).toEqual("#/users");
                Tibbr.pushState.restore()
            });
        });

        describe("path", function () {

            it("should return valid url when prefix", function () {
                window.prefix = "/a/";
                expect(Tibbr.path("images")).toEqual("/a/images")
                window.prefix = undefined
            });
            it("should return valid url when no prefix", function () {
                expect(Tibbr.path("images")).toEqual("/images");
            });
        });

        describe("serverUrl", function () {
            describe("with out prefix", function () {

                it("should return valid server url when controller", function () {
                    expect(Tibbr.serverUrl("users")).toEqual("/users");
                })
                it("should return valid server url when controller and action", function () {
                    expect(Tibbr.serverUrl("users", "show")).toEqual("/users/show");
                });
                it("should return valid server url when controller, action and id", function () {
                    expect(Tibbr.serverUrl("users", "show", 8)).toEqual("/users/8/show");
                });
            });
            describe("with tibbr prefix", function () {
                beforeEach(function () {
                    window.prefix = "/a/";
                });
                it("should return valid server url when controller", function () {
                    expect(Tibbr.serverUrl("users")).toEqual("/a/users");
                });
                it("should return valid server url when controller and action", function () {
                    expect(Tibbr.serverUrl("users", "show")).toEqual("/a/users/show");
                });
                it("should return valid server url when controller, action and id", function () {
                    expect(Tibbr.serverUrl("users", "show", 8)).toEqual("/a/users/8/show");
                });
                afterEach(function () {
                    window.prefix = undefined;
                });
            })

        });


    })
})
