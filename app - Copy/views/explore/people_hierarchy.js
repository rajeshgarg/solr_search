define(['jquery'
    , 'underscore'
    , 'tibbr'
    , "text!templates/explore/user_hierachy.html"
    , "collections/user_hierarchy_list"
    , 'views/users/user_tip'
    ],

    function ($, _, Tibbr, PeopleHierachyView, SuborinateList, UserInfoTip) {
        return  Tibbr.UserHierachyView = Tibbr.View.extend({
            tagName: "li",
            events: {
                "click a.collapsable" : "updateSubordinateView"
            },
            qtipConfig: Tibbr.qtipConfigs.popup,
            initialize: function(){
                this.model.bind('change', this.render, this);
                _.bindAll(this, 'render','renderSubordintes',"updateSubordinateView");
            },
            render: function(){
                var css = {}
                if(this.model.isRootNode)
                    css = {background: "none", padding: "5px", border:"none"}
                $(this.el).css(css).html(this.template.render(PeopleHierachyView, {model: this.model}));

                if(!this.model.get('moreNodes')){
                    this.renderPopup();
                    $('.user-tip',$(this.el)).qtip(this.qtipConfig($(this.el)));
                }
                
                if(this.model.get("isLast"))
                    $(this.el).addClass("last")
                this.renderSubordintes()
                return this;
            },
            renderSubordintes: function(subordinates){
                var self = this;
                (subordinates || this.model.subordinates).map(function(item){
                  self.$("ul#subordinates-"+self.model.get("id"),$(self.el)).append(new Tibbr.UserHierachyView({model: item}).render().el)
                })
                if((subordinates || this.model.subordinates).length > 0)
                    this.$("a.collapsable[rel="+this.model.get("id")+"]").addClass("loaded collapsed")
            },
            updateSubordinateView: function(event){
                var $link = $(event.target), $childrenUl = $("ul#subordinates-"+$link.attr("rel"));

                if($link.is(".collapsed")){
                    $childrenUl.hide();
                  $link.removeClass("collapsed")}
                else{
                    $childrenUl.show();
                    $link.addClass("collapsed")
                }
                if(! $link.is(".loaded")){
                    $link.append(Tibbr.UI.spinner);
                    var subordinates = new SuborinateList(), self = this;
                    subordinates.model = this.model;
                    subordinates.setParent(this.model)
                    subordinates.scopeId = this.model.get("id")
                 subordinates.fetch({success: function(){
                            $link.addClass("loaded");
                            $("img.spinner",$link).remove();
                            self.renderSubordintes(subordinates);
                  }})
                        }
                return false;
            },
            renderPopup:function(){
                var popup = new UserInfoTip({
                    model:this.model,
                    followBtn: true
                });
                $(this.el).append(popup.render().el);
            }
        });
    });