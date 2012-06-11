define(['jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/default_filter'
    , 'collections/default_filters'
    , 'views/home/section'

]
    , function ($, J$, Tibbr, Filter, Filters, SectionView) {

        describe("DefaultSectionView", function () {

            beforeEach(function () {
                var collection = new Filters(Tibbr.i18n.home.filters.defaults);
                this.view = new SectionView({cssId:"default-filters", collection:collection})
            });


            describe("Instantiation", function () {
                it("should create a div element", function () {
                    expect(this.view.el.className).toEqual("section");
                    expect(this.view.el.nodeName).toEqual("DIV");
                });


            });

            describe("Rendering", function () {

                beforeEach(function () {
                    this.view.render();
                });

                it("should have correct values", function () {
                    var view = $(this.view.el);
                    expect(view).toContain('ul#stream-default-filters.filters-items');
                    expect(view.find("li").length).toEqual(6);
                    expect(view.find("li").eq(0))
                        .toHaveHtml('<a id="filter-my_wall" class="custom-filter-link" href="#/messages/my_wall/filters"><img src="/images/my_streams/my_wall.gif" height="17" width="17" alt="My Wall">My Wall</a>');
                    expect(view.find("li").eq(1))
                        .toHaveHtml('<a id="filter-all_post" class="custom-filter-link" href="#/messages/all_post/filters"><img src="/images/my_streams/all_post.gif" height="17" width="17" alt="All Posts">All Posts</a>');
                    expect(view.find("li").eq(2))
                        .toHaveHtml('<a id="filter-private" class="custom-filter-link" href="#/messages/private/filters"><img src="/images/my_streams/private.gif" height="17" width="17" alt="Private Messages">Private Messages</a>');
                    expect(view.find("li").eq(3))
                        .toHaveHtml('<a id="filter-star" class="custom-filter-link" href="#/messages/star/filters"><img src="/images/my_streams/star.gif" height="17" width="17" alt="Starred Messages">Starred Messages</a>');
                    expect(view.find("li").eq(4))
                        .toHaveHtml('<a id="filter-question" class="custom-filter-link" href="#/messages/question/filters"><img src="/images/my_streams/question.gif" height="17" width="17" alt="Polls">Polls</a>');
                    expect(view.find("li").eq(5))
                        .toHaveHtml('<a id="filter-chat" class="custom-filter-link" href="#/messages/chat/filters"><img src="/images/my_streams/chat.gif" height="17" width="17" alt="Chat History">Chat History</a>');

                });


//                it("should select the first element in ul", function () {
//                    var view = $(this.view.el);
//                    expect(view.find("li").eq(0)).toHaveClass("active")
//                });



            });


        });


    });
