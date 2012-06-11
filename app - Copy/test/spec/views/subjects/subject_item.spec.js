define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/subject'
    , 'views/subjects/subject_item'
    , 'fixtures/subjects'
    , 'fixtures/users'
]
    , function ($, J$, Tibbr, Subject, subjectItemView, fixture, usersData) {

        describe("SubjectListView", function () {

            beforeEach(function () {
                this.view = new subjectItemView({model: new Subject(fixture[0])});
            });

            describe("Instantiation", function () {

                it("should have a li element", function () {
                    expect(this.view.el.nodeName).toEqual("LI");
                });
                it("should have subject-li class", function () {
                    expect($(this.view.el)).toHaveClass('subject-li');
                });

            });

            describe("rendering",function(){
                beforeEach(function(){
                   this.html = $(this.view.render().el)
                });

                it("should have subject image", function(){
                    expect(this.html.find('a.profile-pic > img')).toHaveAttr("src", "/assets/khakurel_net/images/subjects/subject_images/000/000/004_medium.png?1323214456")
                });

                it("should have correct link to Subject", function(){
                    expect(this.html.find('h3 > a.subject-name')).toHaveAttr("href","#/subjects/1");
                });
                
                it("should have correct subject description", function(){
                    expect(this.html.find('p.subject-description').text().trim()).toEqual('this is an umbrella subject comprising the various groups active on tibbr.  If your group is not represented, please add it!');
                });

                it("should have action menu image", function(){
                    expect(this.html.find('div.info img.action-menu')).toHaveAttr("src","/images/action-menu.png");
                });

                it("Action menu should have qtip class", function(){
                    expect(this.html.find('div.action-menu-box')).toHaveClass("qtip-content");
                });
              

            });

         });
    });