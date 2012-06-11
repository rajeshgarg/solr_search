define([
    'models/subject'
    , 'fixtures/subjects'
]
    , function (Subject, data) {
        describe("Subject", function () {
            beforeEach(function () {
                this.subject = new Subject(data[0]);
            });


            describe("Attributes", function () {
                it("should have correct displayName", function () {
                    expect(this.subject.displayName()).toEqual("Departments");
                });
                it("should have correct profile Image path", function () {
                    expect(this.subject.get("profileImageMedium")).toEqual("/assets/khakurel_net/images/subjects/subject_images/000/000/004_medium.png?1323214456");
                });

                it("should have correct profile Image ulr", function () {
                    var subject = new Subject({"subject_image_url":"small,http://www.khakurel.net/images/subjects/subject_images/000/000/002_small.jpg?1323214511," +
                        "medium,http://www.khakurel.net/images/subjects/subject_images/000/000/002_medium.jpg?1323214511," +
                        "large,http://www.khakurel.net/images/subjects/subject_images/000/000/002_large.jpg?1323214511"})
                    expect(subject.get("profileImageMedium")).toEqual("http://www.khakurel.net/images/subjects/subject_images/000/000/002_medium.jpg?1323214511");
                });

                it("should have correct url", function () {
                    expect(this.subject.showUrl()).toEqual(Tibbr.url("subjects/" + this.subject.id))
                });

            });

            describe("Parse", function () {
                beforeEach(function () {
                    this.subject = new Subject({ "deleted":false, "description":null, "id":100, "name":"ranu.c", "owner_type":null,
                        "scope":"private", "stype":"system", "user_id":3, "visibility_scope":"public",
                        "actions":null, "subject_image_url":"small,/100_small.jpg,medium,/100_medium.jpg?1323215396,large,001_large.jpg",
                        "display_name":"Ranu Khakurel", "has_children":false,
                        "user":{"deleted":false, "email":"suraj@khakurel.net", "first_name":"Suraj", "id":2, "last_name":"Khakurel", "login":"suraj", "profile_image_url":"small,/assets/khakurel_net/images/users/profile_images/000/000/002_small.jpg?1323214511,medium,/assets/khakurel_net/images/users/profile_images/000/000/002_medium.jpg?1323214511,large,/assets/khakurel_net/images/users/profile_images/000/000/002_large.jpg?1323214511",
                            "actions":null, "display_name":"Suraj Khakurel"}
                    });
                });

                it("should parse correctly subject user", function () {
                    this.subject.build();
                    expect(this.subject.user.showUrl()).toEqual("#/users/2");
                });

                it("should parse correctly subject user", function () {
                    this.subject = new Subject(data[0]);
                    this.subject.build();
                    expect(this.subject.user).toEqual(undefined);
                    expect(this.subject.get('user')).toEqual("");
                });


            });

        });
    });
