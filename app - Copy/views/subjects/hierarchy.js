define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'backbone'
    , 'views/subjects/hierarchy_item'
    , 'text!templates/subjects/hierarchy.html'
]
    , function ($, _, Tibbr,Backbone, directoryItem, directoryTmpl) {
        return Tibbr.SubjectDirectoryView = Tibbr.View.extend({
            className: this.className || "hierarchy-wrap",

            initialize:function (options) {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                this.className == "children-wrap" ? this.hasChildren = true : this.hasChildren = false;
                $(this.el).html(this.template.render(directoryTmpl, {hasChildren:this.hasChildren}));
            },
            render:function () {

                var collection = this.collection,
                    collectionSize = collection.size(),
                    that = this,
                    $directory;

                console.log(collection);

                var $directory = this.$("> ul");
                this.$("> ul >li.more").remove();
                this.$("> ul >li.last").remove();
                if(collectionSize !== 0){
                    collection.each(function (model, index) {
                        if(index == 0)
                            model.set({"additonalClasses": "first"});


                        var itemView = new directoryItem({
                            model: model,
                            collection: collection
                        });
                        $directory.append(itemView.render().el);


                    });
                    if (this.collection.hasMorePages) {
                        this.addExtraNodes(true);
                    }
                    else{
                        this.addExtraNodes()
                    }

                }
                else{
                    this.addExtraNodes();
                }
                return this;
            },
            addExtraNodes: function(hasMorePages){
                if(hasMorePages){
                    var seeMoreNode = new directoryItem({
                        model: new Backbone.Model({"moreNodes":true,"seeMoreNode" : true,"additonalClasses": "more"}),
                        collection: this.collection
                    });
                    this.$("> ul").append(seeMoreNode.render().el);
                }
                var createSubNode = new directoryItem({
                    model: new Backbone.Model({"moreNodes":true,"createSubjectNode" : true,"additonalClasses": "last"})
                });
                this.$(" > ul").append(createSubNode.render().el);
            }

        });
    });