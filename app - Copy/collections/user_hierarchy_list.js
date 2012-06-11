define([
       "jquery"
       ,'underscore'
       ,"backbone"
       , "tibbr"
       ,"models/hierarchy_node"
    ]
  , function ($,_ ,Backbone, Tibbr, HierarchyNode) {
        return Tibbr.UserHierarchyList = Tibbr.Collection.extend({
            className: "hierarchy",
            model: Tibbr.HierarchyNode,
            tibbrURL: function(){
               var url = {controller: "users", action: "children"}
                if(this.parentNode)
                   url['id'] =  this.parentNode.id
                return url;
            },
            updateChildren: function(items){
                this.add(items);
                this.fetched = true;
            },
            parse: function(data){
              var children =  data ||[] , targetUserId = this.parentNode ? this.parentNode.get("targetUserId") : 0;
              return  _.map(children, function(item){
                         item["isRootNode"] = false;
                         item["targetUserId"] = targetUserId;
                        item["isLast"] = (item == children[children.length - 1])
                       return new Tibbr.HierarchyNode(item)
                })
            },
            setParent: function(parent){
                this.parentNode = parent
            },
            loadFromServer: function(options){
                this.reset();
                var options = options || {};
                this.scopeId = this.parentNode.id;
                 var success = function(arg,arg1,arg2){
                     this.fetched = true;
                     if(typeof options.success=="function")
                         options.success(arg,arg1,arg2)
                 }
                 options['success'] = success
                 this.fetch(options)
            }
        });
    });