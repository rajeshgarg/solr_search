define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'text!templates/common/traditional_pagination.html'
    ]
    , function ($, _, Tibbr, Pagination) {
        return Tibbr.TraditionaPaginationView = Tibbr.View.extend({
            tagName:'p',
            
            collection:null,
            events:{
                "click a.trad_page_link": "paginate"
            },
            initialize:function (options) {
                this.collection = this.options.collection;
                _.bindAll(this, 'render');
            },
            render:function () {
                var pages = [];
                for(var i=1; i < this.options.collection.total_pages+1;i++){
                    pages.push(i)
                    }
                $(this.el).html(this.template.render(Pagination,{
                    pages: pages,
                    collection: this.collection
                    }));
            },
            paginate:function (event) {
                event.preventDefault();
                var $link = $(event.target),  page = $link.attr("rel"), dataParams = this.options.collection.getParams();
                $link.append(Tibbr.UI.spinner)
                        dataParams.params =_.extend(dataParams.params || {},{
                            page: page
                        });
                this.options.collection.paginate(dataParams,{});
                return false;
            }
        });
    });