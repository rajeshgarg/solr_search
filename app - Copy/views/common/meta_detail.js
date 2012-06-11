define([
    'jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'require/backbone-forms'
    , 'require/jquery-ui-editors'

], function ($, _, Backbone, Tibbr) {

    return Tibbr.MetaDetailView = Tibbr.View.extend({

        initialize:function () {
            _.bindAll(this, 'render', 'getValue');
        },

        render:function () {
           this.form = new Backbone.Form({
                model: this.model
            }).render();
            $(this.el).append(this.form.el);
            return this;

        },
        getValue: function(){
            return this.form.getValue();
        }

    });
});