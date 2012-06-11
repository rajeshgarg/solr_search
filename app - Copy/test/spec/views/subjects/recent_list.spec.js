define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/subject'
    , 'collections/recent_subjects'
    , 'views/subjects/recent_list'
    , 'fixtures/subjects'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, Subject, RecentSubjects, SubjectListView, fixture, usersData) {

        describe("RecentSubjectListView", function () {

            beforeEach(function () {
                var subjectFirst = fixture[0]; subjectFirst.user = usersData[0];
                var subjectSecond = fixture[1]; subjectSecond.user = usersData[1];
                this.view = new SubjectListView({header: "Recently Created Subjects", collection: new RecentSubjects([subjectFirst, subjectSecond])});
            });

            describe("Instantiation", function () {

                it("should have a div element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                });
                it("should have a class of 'flash'", function () {
                    expect($(this.view.el)).toHaveClass('flash');
                });

            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.html = $(this.view.render().el)
                });

                it("should have correct header", function(){
//                    expect(this.html).toContain("a.profile-pic")
                    expect(this.html.find('h3')).toHaveText("Recently Created Subjects");
                    expect(this.html.find('#recommendations > li').length).toEqual(2);
                });
                it("should display see more", function(){

                })

            });
        });
    });