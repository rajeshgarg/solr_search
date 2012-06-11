define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/analytics_node'
    , "collections/analytics_nodes"
    , 'views/charts/line'
    , 'views/charts/bar'
    , 'text!templates/subjects/trends_analytics.html'
]
    , function ($, _, Tibbr, Node, AnalyticsNodes, LineChartView, BarChartView, Trends) {
        return Tibbr.TrendsView = Tibbr.View.extend({
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render', 'renderBar', 'renderLine');
            },
            render:function () {
                var nodes = new AnalyticsNodes(this.model.analyticsNodes());
                var messages = nodes.messages(), replies = nodes.replies(), hotTopicsList = nodes.hotTopic(),
                    hotTopic = hotTopicsList.cNodes();
                var messageStats = messages.cNodes().map(function (item) {
                        var time = (item.id).split("..")[1];
                        return [time, item.value];
                    }),
                    replyStats = replies.cNodes().map(function (item) {
                        var time = (item.id).split("..")[1];
                        return [time, item.value];
                    });
                var messageCount = messages.get('count'),
                    replyCount = replies.get('count');
                this.data = [messageStats, replyStats];
                this.bardata = [messageCount, replyCount];
                this.$el.html(this.template.render(Trends, {model:this.model, hotTopic: hotTopic, messages_count:messageCount, replies_count: replyCount}));
                return this;
            },
            renderBar: function() {
            return new BarChartView({divId:"bar_trends", data:this.bardata}).render().el;
            },
            renderLine:function () {
                return new LineChartView({divId:"more_trends", data:this.data}).render().el;
            }
        });
    });