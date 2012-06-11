define(['jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/explore/my_people_list_item'
    , 'views/common/scroll_pagination'
    , "text!templates/explore/my_people_list.html"
],

    function ($, _, Tibbr, MyPeopleListItem,scrollPagination, peopletmpl) {
        return  Tibbr.UserBoxListView = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                this.collection.bind("pageFetched",this.pageLoad, this);
            },
            render:function () {
                $(this.el).html(this.template.render(peopletmpl, {user:Tibbr.currentUser, collection:this.collection, text:this.t('my_people.' + this.options.type)}));
                var collection = this.collection, $ele = this.$(".people-list");
                collection.each(function (user) {
                    var view = new MyPeopleListItem({
                        model:user,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                });
               this.renderPagination();
               return this;
            },
            pageLoad: function(lastIndex){
                var collection = this.collection, $ele = this.$(".people-list");
                collection.each(function (user,index) {
                    if(lastIndex <= index){
                    var view = new MyPeopleListItem({
                        model:user,
                        collection:collection
                    });
                    $(view.render().el).prependTo($ele);
                }
                });
                this.renderPagination();
            },
            renderPagination: function(){
                var $ele = this.$(".people-list");
                 this.$("li.pagination-list").remove();
                 var pagination = new scrollPagination({collection: this.collection, pageScroller: $ele})
                 pagination.el = $("<li class='pagination-list'></li>");
                 $ele.append(pagination.render().el);
            }
        });
    });