define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/analytics_node'
    , "collections/analytics_nodes"
    , 'views/charts/line'
    , 'text!templates/subjects/trends.html'
]
    , function ($, _, Tibbr, Node, AnalyticsNodes, LineChartView, Trends) {
        return Tibbr.TrendsView = Tibbr.View.extend({
            events:{},
            initialize:function (options) {
                _.bindAll(this, 'render');
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
                    this.data = [messageStats, replyStats];
                var messageCount = messages.get('count'),
                replyCount = replies.get('count');
                this.$el.html(this.template.render(Trends, {model:this.model, hotTopic: hotTopic, messages_count:messageCount, replies_count: replyCount}));
                return this;
            },
            renderLine:function () {
                return new LineChartView({divId:"subjectTrends", data:this.data}).render().el;
            }
        });
    });