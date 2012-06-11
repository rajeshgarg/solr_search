define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/subjects/subject_list'
    , 'text!templates/subjects/subject_layout.html'
]
    , function ($, _, Tibbr,SubjectListView, subject_layout) {
        return Tibbr.SubjectLayout = Tibbr.View.extend({
          className:"grid_16 subjects",
          id:"subject-tab",
          observerHandle: null,
          events:{
              "keyup input#subject-list-str" : "searchInputObserver",
              "change input#my_subjects" : "searchInputObserver"
           },
            initialize:function () {
                _.bindAll(this, 'render');
            },
            render:function () {
                var collection = this.collection, $ele = $(this.el);
                collectionSize = collection.size();
                $(this.el).html(this.template.render(subject_layout,{collectionSize:collectionSize}));
                this.$("#subject-display").html(new SubjectListView({collection:collection}).render().el)
                return this;
            },
            searchInputObserver: function(event){
                if(this.observerHandle)
                window.clearTimeout(this.observerHandle);
                var self = this;
                this.resetUI();
                var search_str = self.$("input#subject-list-str").val();
                var params = {params: {page:(this.current_page || 0) + 1, set_actions:true, per_page:30,search_str: search_str}}
                if(self.$("input#my_subjects").is(':checked'))
                    params.params["owner_id"] = Tibbr.currentUser.id;
                else 
                    params.params["subscribers"] = Tibbr.currentUser.id;
                this.options.collection.setParams(params, true);
                this.observerHandle =  setTimeout(function(){self.$("span.search-status").first().html(Tibbr.UI.spinner);self.options.collection.fetch({success: function(){self.resetUI()},data: params})},500)
            },
            resetUI: function(){
                this.$("span.search-status").first().html("");
            }

        });
    });