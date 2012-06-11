define([
    "jquery"
    , "tibbr"
    , "models/analytics_node"
]
    , function ($, Tibbr, analyticsNode) {
        return    Tibbr.AnalyticsFontNodes = Tibbr.Collection.extend({
            className:"AnalyticsFrontNodes",
            model:analyticsNode,
            messages:function () {
               return this.find(function (node) {
                    return node.get('name') === "messages"
                })
            },
            replies:function() {
               return this.find(function (node) {
                    return node.get('name') === "replies"
               })
            },
            hotTopic: function() {
                return this.find(function (node) {
                    return node.get('name') === "parent_id"
                })
            }
        });

    });