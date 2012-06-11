define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    ]
    , function ($, _, Tibbr) {
        return Tibbr.TraditionaPaginationView = Tibbr.View.extend({
            tagName:'p',
            collection:null,
            pageScroller: $(),
            initialize:function() {
                _.bindAll(this, 'render','paginate');
                this.collection = this.options.collection;
                this.pageScroller = $(this.options.pageScroller) || $();
                if(this.pageScroller){
                    $(this.pageScroller).scroll(this.paginate);
                }
            },
            render:function() {
                $(this.el).append(Tibbr.UI.loader);
                $(".line-loader",this.el).hide();
                return this;
            },
            paginate:function (event) {
                var pageScroller = this.pageScroller, $element = $(event.target), 
                scrollTop = $element.prop('scrollTop'),scrollHeight = $element.prop('scrollHeight'),
                windowHeight = $element.prop('clientHeight');

                if (scrollTop >= (scrollHeight - (windowHeight + 0))) {
                    if(pageScroller.is(".fetching-page")){
                        return false
                        }
                    pageScroller.addClass("fetching-page");
                    var lastIndex = this.options.collection.length, collection =  this.options.collection,
                    nextPage = this.options.collection.nextPage;
                    if(this.collection.hasMorePages){
                        $(".line-loader",this.el).show();
                        var dataParams = this.collection.getParams();
                        dataParams.params =_.extend(dataParams.params || {},{
                            page: nextPage
                        });
                        this.collection.paginate(dataParams,{
                            append: true,
                            silent: true,
                            success:function(){
                                pageScroller.removeClass("fetching-page");
                                collection.trigger("pageFetched",lastIndex, nextPage);
                            }
                        });
                    }
                }
                return false;
            }
        });
    });