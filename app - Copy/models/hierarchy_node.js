define([
    "jquery"
    , 'underscore'
    , "tibbr"
    , "models/user"
    , "collections/user_hierarchy_list"
]
    , function ($, _, Tibbr, User, HierarchyList) {
        return Tibbr.HierarchyNode = User.extend({
            className: "subordinate",
            initialize:function(attr,options){
                 _.bindAll(this,"updateSubordinates")
                this._initialize(attr,options)
                this.isRootNode = this.get("isRootNode") || false;
                this.subordinates = new Tibbr.UserHierarchyList();
                this.updateSubordinates()
                this.bind("updateSubordinates", function(){
                this.updateSubordinates();
            });
           },
             url: function(){
                return Tibbr.serverUrl( "users",  this.id ? "ancestry_tree?params[set_actions]=true" : "tree_root?params[set_actions]=true", this.id)
            },
            updateSubordinates: function(){
               var subordinates = this.get("children")||[],  targetUserId = this.get("targetUserId") || 0;
               this.subordinates = new HierarchyList();
               if(! this.subordinates.fetched){
                this.subordinates.reset(_.map(subordinates,function(item){
                    item["isRootNode"] = false;
                    item["targetUserId"] = targetUserId;
                    item["isLast"] = (item == subordinates[subordinates.length - 1])
                    return new Tibbr.HierarchyNode(item)
                }))
               this.subordinates.setParent(this);
               }
            }
        });
    });