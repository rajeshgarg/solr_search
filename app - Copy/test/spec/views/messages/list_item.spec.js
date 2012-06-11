define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/message'
    , 'views/messages/list_item'
    , 'fixtures/messages'
]
    , function ($, J$, Tibbr, Message, ListView, fixture) {

        describe("MessageListView", function () {

            beforeEach(function () {
                this.view = new ListView({model:new Message(fixture[0])});
            });

            describe("Instantiation", function () {

                it("should create a LI element", function () {
                    expect(this.view.el.nodeName).toEqual("LI");
                });

                it("should have a class of 'entry'", function () {
                    expect($(this.view.el)).toHaveClass('entry');
                });


            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.view.render();
                });

                it("should have correct profile image", function () {
                    var view = $(this.view.el);
                    expect(view.find("a.profile-pic").find("img")).toHaveAttr("src", "/assets/khakurel_net/images/users/profile_images/000/000/002_medium.jpg?1323214511");
                });

                it("should have correct posted to", function () {
                    var view = $(this.view.el);
                    expect(view).toContain("div.msg_subjects");
                    expect(view.find(".passive-name").length).toEqual(2);
                    expect(view.find(".passive-name").first()).toHaveAttr("title", "Click here to go to Ranu Khakurel");
                    expect(view.find(".passive-name").first()).toHaveAttr("href", "#/subjects/27");
                    expect(view.find(".passive-name").first()).toHaveText("Ranu Khakurel");
                    expect(view.find(".passive-name").last()).toHaveText("Suraj Khakurel");

                });

                it("should not have replies", function () {
                    expect($(this.view.el)).not.toContain("ul.comment-list");
                });

                it("should  have replies", function () {
                    var view = new ListView({model:new Message(fixture[3])}),
                        html = view.render(), $html = $(html.el);
                    expect($html).toContain("ul.comment-list");
                    expect($html.find("li.reply").length).toEqual(2);
                    var firstReply = $html.find("li.reply").first();
                    expect(firstReply.find("a.profile-pic")).toHaveAttr("href", "#/users/2")
                    expect(firstReply.find("img")).toHaveAttr("src", "/assets/khakurel_net/images/users/profile_images/000/000/002_medium.jpg?1323214511")
                    expect(firstReply.find("p.msg").html()).toMatch('<a class="user_url active-name" href="#">Suraj Khakurel</a> <br> First picture to tibbr')
                });

                it("should have toggle-comment with correct text", function () {
                    var view = new ListView({model:new Message(fixture[3])}),
                        html = view.render(), $html = $(html.el);
                    expect($html.find(".toggle-comment")).toHaveText("Show all 3 replies");
                });

                it("should have toggle-comment with correct text", function () {
                    var view = new ListView({model:new Message(fixture[4])}),
                        html = view.render(), $html = $(html.el);
                    expect($html.find(".toggle-comment")).toHaveText("Collapse replies");
                });


            });

            describe("showReplyBox", function () {
                beforeEach(function () {
                    this.view.render();
                });

                it("should not have reply form", function () {
                    var view = $(this.view.el);
                    expect(view.find(".reply-box")).toHaveAttr("style", "display: none");
                    expect(view.find(".reply-box-form").length).toEqual(0)
                });

                it("should have reply form", function () {
                    var view = $(this.view.el);
                    view.find(".reply-link").click();
                    expect(view.find(".reply-box-form").length).toEqual(1)
                });

            });

            describe("toggleComment", function () {
                beforeEach(function () {
                    var view = new ListView({model:new Message(fixture[4])}),
                        html = view.render();
                    this.html = $(html.el);
                });

                it("should display  all the reply", function () {

                    expect(this.html.find(".comment-list > li").length).toEqual(3);
                    expect(this.html.find(".comment-list > li").eq(0)).not.toHaveAttr("style");
                    expect(this.html.find(".comment-list > li").eq(1)).not.toHaveAttr("style");
                    expect(this.html.find(".comment-list > li").eq(2)).not.toHaveAttr("style");
                });
//                it("should hide 3rd reply", function () {
//                   $(this.html).find("a.toggle-comment").click();
//                    console.log(this.html, $(this.html).find("a.toggle-comment"))
//                    expect(this.html.find(".comment-list > li").length).toEqual(3);
//                    expect(this.html.find(".comment-list > li").eq(0)).not.toHaveAttr("style");
//                    expect(this.html.find(".comment-list > li").eq(1)).not.toHaveAttr("style");
//                    expect(this.html.find(".comment-list > li").eq(2)).not.toHaveAttr("style");
//                });
            })


        });


    });