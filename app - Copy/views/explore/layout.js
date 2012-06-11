define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , "views/common/tabs"
    , 'text!templates/explore/layout.html'
]
    , function ($, _, Tibbr, TabsView, recent_list) {
        return Tibbr.ExploreLayout = Tibbr.View.extend({
            observerHandle: null,
            events:{
                "submit form#search_people" : "searchByString",
                "keyup form#search_people input#search_str" : "searchInputObserver",
                "click a.people-filter-link": "filterLinkHandler"
            },
            initialize:function () {
                _.bindAll(this, 'render',"switchSubTab");
               
            },
            render:function () {
                //this.setTabs(1);
                //$(this.el).html(this.template.render(people_tab,{directory_selected: "ui-state-active"}))
                var selectedChar = this.options.params.s_with || "";
                $(this.el).html(this.template.render(recent_list,{s_with: selectedChar}));
                return this;
            },
            searchByString : function(){
                var search_str = this.$("form#search_people input#search_str").val();
                var params = {params: {search_str: search_str,set_action: true}}
                 this.collection.setParams(params);
                this.options.resultList.paginate({data:params})
                return false;
            },
            searchInputObserver: function(event){
                if(this.observerHandle)
                    window.clearTimeout(this.observerHandle);
               this.resetUI();
               var self = this, search_str = self.$("form#search_people input#search_str").val(), params = {params: {search_str: search_str,set_actions: true}};
               this.options.resultList.setParams(params);
               this.observerHandle =  setTimeout(function(){self.$("span.search-status").first().html(Tibbr.UI.spinner);self.options.resultList.paginate(null,{success: function(){self.resetUI()}})},500)
            },
            filterLinkHandler: function(event){
                   var $link = $(event.target),s_with = $link.attr("rel");
                   this.resetUI();
                   var self = this;
                   $link.append(Tibbr.UI.spinner);
                   self.$("form#search_people input#search_str").val("");
                   $($link.parent("li")).addClass("active");
                   var params = {params:{starts_with_first_name: s_with, set_actions:true}}
                   this.options.resultList.setParams(params);
                   this.options.resultList.fetch({
                       success: function(){$link.find("img.spinner").remove()},
                       data:params})
                   return false;

            },
            resetUI: function(){
                this.$("ul.filters-list li").removeClass("active");
                this.$("ul.filters-list li").has("img.spinner").find("img.spinner").remove();
                this.$("span.search-status").first().html("");
            },
            // this needs to be handled using sub-tab...
            switchSubTab: function(type, func){
              this.$("ul#sub-tabs li").removeClass("ui-state-active");
             if(type=="list"){
                   this.$("ul#sub-tabs li.list").addClass("ui-state-active");
                 this.$("#list-tab").show();
                 this.$("#hierarchy-tab").hide();
             }
             else if(type=="hierarchy"){
                  this.$("#sub-tabs li.hierarchy").addClass("ui-state-active");
                 this.$("#list-tab").hide();
                 this.$("#hierarchy-tab").show();}
             if(typeof(func)=="function") func();
            }
            
        });
    });