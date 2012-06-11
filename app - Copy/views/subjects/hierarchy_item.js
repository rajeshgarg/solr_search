define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'collections/subjects_hierarchy_child'
    , 'views/common/popup_tip'
    , 'text!templates/subjects/hierarchy_item.html'
    , 'modules/overlay'
    , 'views/subjects/new_edit_form'
]
    , function ($, _, Tibbr, SubjectHierarchy,popupView, directoryItemTmpl,Overlay,NewEditFormView) {
        return Tibbr.SubjectDirectoryItemView = Tibbr.View.extend({
            tagName:"li",
            className: "subject",
            qtipConfig: Tibbr.qtipConfigs.popup,
            events: {
                'click a.collapsable' : 'addChildren',
                'click a.create-subject' : 'createSubject',
                'click a.more-subjects' : 'loadMoreSubjects'
            },
            initialize:function () {
                _.bindAll(this, 'render');
            },
            render:function () {
               $(this.el).html(this.template.render(directoryItemTmpl, {model:this.model}))
                    .addClass(this.model.get('additonalClasses') || "");

                if(!this.model.get('moreNodes')){
                    this.renderPopup();
                    $('.q-tip',$(this.el)).qtip(this.qtipConfig($(this.el)));
                }

                return this;
            },
            renderPopup:function(){
                 var popup = new popupView({model:this.model});
                 $(this.el).append(popup.render().el);
            },
            loadMoreSubjects: function(evt){
                $(evt.target).append(spinner);
                this.collection.getMoreSubjects();
                return false;
            },
            createSubject: function(){// Opens Subject Creation form in overly
//                Overlay.view((new NewEditFormView({className: "test"}).render().el));
                Tibbr.app.navigate(Tibbr.url("subjects/new"),true);
                return false;
            },
            addChildren: function(evt){
                var $target = $(evt.target),
                    $parentListItem = $target.parent();
                $target.toggleClass('collapsed');
                if($target.is('.ajax-success')){
                    this.toggleCollapse($target);
                    return false;
                }
                var id = parseInt(this.model.get('id'));
                var collection  = new SubjectHierarchy();
                collection.scopeId = id;
                collection.fetch({success: function(){
                          var directory = new Tibbr.SubjectDirectoryView({collection: collection, additonalClasses: 'children', className: 'children-wrap'});
                          $parentListItem.append(directory.render().el);
                          $target.addClass('ajax-success');
                          $('.spinner',$parentListItem).remove();
                    }
                })
                console.log('children collection: ',collection)

                $target.append($(spinner).width(12).height(12));
                return false;
            },
            toggleCollapse: function($node){
                $('ul:eq(0)',$node.parent()).toggle();
            }

        });
    });