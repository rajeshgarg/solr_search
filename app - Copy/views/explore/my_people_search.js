define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'views/explore/my_people_search'
    , "text!templates/explore/my_people_search.html"
],

    function ($, _, Tibbr, MyPeopleSearch, PeopleSearchView) {
        return  Tibbr.PeopleSearchView = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render');
            },
            render:function () {
                $(this.el).html(this.template.render(PeopleSearchView, {user:Tibbr.currentUser, collection:this.collection, text:this.t('my_people.' + this.options.type), count: this.options.count}));
                return this;
            }
        });
    });