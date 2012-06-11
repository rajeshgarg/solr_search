
define([
    'jquery'
    , 'underscore'
    , 'tibbr'

    , 'text!templates/subjects/users_list.html'
]
    , function ($, _, Tibbr,UsersList) {
        return Tibbr.UserList = Tibbr.View.extend({
          tagName:"li",
            initialize:function () {
                _.bindAll(this, 'render');
              this.model.bind('change',this.render,this);
             
            },
            render:function () {
                $(this.el).html(this.template.render(UsersList,{model:this.model}));
                
                return this;
            }
        });
    });