define([
    'tibbr',
    'models/user'
    , 'collections/followers'
    , 'fixtures/users'
]
    , function (Tibbr,User, Followers, UserData) {
        describe("User", function () {
            beforeEach(function () {
                Tibbr.data.reset();
                this.user = new User(UserData[0]);
            });


            describe("Attributes", function () {

                it("should have correct profile Image path", function () {
                    expect(this.user.get("profileImage")).toEqual("/assets/khakurel_net/images/users/profile_images/000/000/002_small.jpg?1323214511")
                    expect(this.user.get("profileImageLarge")).toEqual("/assets/khakurel_net/images/users/profile_images/000/000/002_large.jpg?1323214511")
                    expect(this.user.get("profileImageMedium")).toEqual("/assets/khakurel_net/images/users/profile_images/000/000/002_medium.jpg?1323214511")
                });

                it("should have correct profile Image ulr", function () {
                    var user = new User({"profile_image_url":"small,http://www.khakurel.net/images/users/profile_images/000/000/002_small.jpg?1323214511,medium,http://www.khakurel.net/images/users/profile_images/000/000/002_medium.jpg?1323214511,large,http://www.khakurel.net/images/users/profile_images/000/000/002_large.jpg?1323214511"})
                    expect(user.get("profileImage")).toEqual("http://www.khakurel.net/images/users/profile_images/000/000/002_small.jpg?1323214511")
                    expect(user.get("profileImageLarge")).toEqual("http://www.khakurel.net/images/users/profile_images/000/000/002_large.jpg?1323214511")
                    expect(user.get("profileImageMedium")).toEqual("http://www.khakurel.net/images/users/profile_images/000/000/002_medium.jpg?1323214511")
                });

            });

            describe("Url", function () {
                it("should have correct url", function () {
                    expect(this.user.showUrl()).toEqual(Tibbr.url("users/" + this.user.id));
                });
                it("should have correct edit url", function () {
                    expect(this.user.editUrl()).toEqual(Tibbr.url("users/" + this.user.id + "/edit"));
                });
                it("should have correct followers url", function () {
                    expect(this.user.followersUrl()).toEqual(Tibbr.url("users/" + this.user.id +"/followers"));
                });
                it("should have correct following url", function () {
                    expect(this.user.followingUrl()).toEqual(Tibbr.url("users/" + this.user.id + "/following"));
                });


            });

            describe("followers", function () {
                it("should return empty followers object", function () {
                    expect(this.user.followers()).toEqual({})
                });

                it("should return followers object", function () {
                    this.user.dataSet.set({id:"followers", data:{"type":"collection", "current_page":1, "per_page":30, "total_entries":1, "total_pages":1, "items":[UserData[1]]}, scope:this.user.id});
                    expect(this.user.followers().total_entries).toEqual(1)
                });
            })

        });
    });
