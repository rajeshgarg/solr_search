define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/message_filter'
    , 'views/filters/filter_list_item'
    , 'views/filters/criteria_list'
    , 'collections/filter_criterias'
    , 'models/filter_criteria'
    , 'text!templates/filters/manage.html'
    , 'text!templates/filters/filter_list_item.html'
    , 'text!templates/filters/add_filter.html'
    , 'text!templates/filters/more_filter_options.html'
    , 'text!templates/filters/criteria_list.html']
    , function ($, _, Tibbr, MessageFilter, FilterListItemView, CriteriaListView, FilterCriterias, FilterCriteria, manageMessages, filterList, addFilter, addMoreOptions, criteriaList) {
        return Tibbr.ManageFilter = Tibbr.View.extend({
            className:"",
            events:{
                "click a#add_new_filter":"addFilter",
                "click p#more-filter a":"addMoreOptions",
                "click .filter-add": "addKeyWord"
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.keywords = new FilterCriterias();
                //this.keywords = new FilterCriterias();
            },
            render:function () {
                $(this.el).html(this.template.render(manageMessages));
                var collection = this.collection, $ele = this.$("#filters_list");
                collection.each(function(filter) {
                    var view = new FilterListItemView({
                        model:filter,
                        collection:collection
                    });
                    $ele.append(view.render().el);
                });
                return this;
            },
            addFilter:function() {
                var $ele = this.$("#form_container");
                $ele.append(addFilter);
                return this;

            },
            addMoreOptions:function(event) {
                var $ele = $(event.target);
                $ele.replaceWith(this.template.render(addMoreOptions));
                return this;
            },
            addKeyWord:function(event) {
                var $ele = $(event.target);
                var $textBox = $ele.parent().find("input");
                var criteria = new FilterCriteria({cvalue: $textBox.val() });
                this.keywords.add(criteria);
                var view = new CriteriaListView({value: $textBox.val(), model: criteria });
                this.$("#current_list_keywords").append(view.render().el);
            }
        });
    });