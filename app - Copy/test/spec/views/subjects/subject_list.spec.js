define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/subject'
    , 'collections/subjects_search'
    , 'views/subjects/subject_list'
    , 'fixtures/subjects'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, Subject, SubjectsSearch, SubjectListView, fixture, usersData) {

        describe("SubjectListView", function () {

            beforeEach(function () {
                var subjectFirst = fixture[0]; subjectFirst.user = usersData[0];
                var subjectSecond = fixture[1]; subjectSecond.user = usersData[1];
                this.view = new SubjectListView({collection: new SubjectsSearch([subjectFirst, subjectSecond])});
            });

            describe("Instantiation", function () {

                it("should have a UL element", function () {
                    expect(this.view.el.nodeName).toEqual("UL");
                });
                it("should have subject-list class", function () {
                    expect($(this.view.el)).toHaveClass('subject-list');
                });

            });
  
         });
    });