define([
    'underscore'
    , 'tibbr'
    
    ]
    , function ( _, Tibbr) {
        return Tibbr.Role = Tibbr.Model.extend({
            baseName:"roles",
            initialize:function () {
                _.bindAll(this
                    ,'add_users');

            },
            find_by_rolename_and_context:function(rolename,context_id, context_type){
                this.url = "roles/find_by_rolename_and_context";
                this.fetch({
                    data:{
                        params:{
                            "context_id":context_id,
                            "context_type":context_type,
                            "include_members":"true",
                            "include_privileges":"true",
                            "rolename":rolename
                        }
                    },
                    complete:function (data) {
                        if (data.status === 200) {
                            console.log("added");
                        }
                    }
                });
            },
            add_users: function(model,user_ids, group_ids){
                this.action("add_members", "update", {
                    data:{
                        id:this.get('id'),
                        params:{
                            user_ids: user_ids,
                            group_ids: group_ids
                        }
                    },
                    complete:function (data) {
                        if (data.status === 200) {
                            console.log("added");
                            model.trigger("role:change");
                        }
                    }
                });
            },
            remove_users:function(model,user_ids,group_ids){
                this.action("remove_members","update", {
                    data:{
                        id:this.get('id'),
                        params:{
                            "group_ids":"",
                            "user_ids":user_ids
                        }
                    },
                    complete:function (data) {
                        if (data.status === 200) {
                            console.log('Removed');
                            model.trigger("role:change");

                        }
                    }
                });
            }
        });
    });

