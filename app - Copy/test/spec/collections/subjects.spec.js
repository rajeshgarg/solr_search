define([
    'tibbr',
    'collections/subjects',
    'models/subject',
    'fixtures/subjects'
]
    , function (Tibbr, Subjects, Subject, subjectData) {
        describe("Subjects", function () {

            beforeEach(function () {
                this.subjects = new Subjects();
            });

            describe("Attributes", function () {
                it("should have cssName", function () {
                    expect(this.subjects.className).toEqual("subjects");
                });
                it("should have current model", function () {
                    expect(this.subjects.model).toEqual(Subject)
                })
            });


        });
    })
