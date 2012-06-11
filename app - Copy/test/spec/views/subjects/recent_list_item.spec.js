define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/subject'
    , 'views/subjects/recent_list_item'
    , 'fixtures/subjects'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, Subject, SubjectListView, fixture, usersData) {

        describe("RecentSubjectLisItemView", function () {

            beforeEach(function () {
                var data = fixture[0];
                    data.user = usersData[0]; // assign user to the subject
                this.view = new SubjectListView({model:new Subject(data)});
            });

            describe("Instantiation", function () {

                it("should create a li element", function () {
                    expect(this.view.el.nodeName).toEqual("LI");
                });
            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.html = $(this.view.render().el)
                });

                it("should have correct profile picture", function(){
//                    expect(this.html).toContain("a.profile-pic")
                    expect(this.html.find('a.profile-pic > img')).toHaveAttr("src", "/assets/khakurel_net/images/subjects/subject_images/000/000/004_medium.png?1323214456")
                }) ;
            });
        });
    });