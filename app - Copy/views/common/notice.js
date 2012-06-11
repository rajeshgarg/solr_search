define([
    'jquery'
    , 'underscore'
    , 'backbone'

], function ($, _, Backbone) {

    return Backbone.View.extend({
        id:'tibbr-notice',
        displayLength:5000,
        defaultMessage:'',

        initialize:function () {
            _.bindAll(this, 'render');
            this.message = this.options.message || this.defaultMessage;
            this.render();
        },

        render:function () {
            var _self = this;
            var msg = $('<div>')
                .addClass("tibbr-message")
                .append(this.message)
                .css('z-index', 100000)
                .hide();
            var container = $('#' + this.id);
            if (container.length > 0) {
                container.append(msg);
            } else {
                $('#content').prepend(this.el);
                $(this.el).append(msg);
            }
            $(msg).slideDown();

            if (this.displayLength) {
                var timerId = window.setInterval(function () {
                    clearInterval(timerId);
                    $(msg).slideUp(200, function () {
                        msg.remove();
                    });
                }, _self.displayLength);
            }
            return this;
        }

    });
});