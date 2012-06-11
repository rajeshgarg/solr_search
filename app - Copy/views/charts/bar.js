define([
    'order!jquery'
    , 'order!underscore'
    , 'order!tibbr'
    , "order!require/jqplot"
    , "order!require/jqplot-barRenderer"
    , "order!require/jqplot-dateAxisRenderer"
    , "order!require/jqplot-highlighter"
    , "order!require/jqplot-pointLabels"
    , "order!require/jqplot-canvasTextRenderer"
    , "order!require/jqplot-canvasAxisLabelRenderer"
    , "order!require/jqplot-categoryAxisRenderer"
]
    , function ($, _, Tibbr) {
        return Tibbr.BarChartView = Tibbr.View.extend({
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.divId = this.options.divId;
                this.data = this.options.data;
            },
            id:"mybarGrap",
            events:{},
            render:function () {
                this.renderBarGraph();
                return this;
            },
            renderBarGraph:function () {
                $.jqplot(this.divId, [this.data], {
                    seriesColors:["#000000", "#666666"],
                    highlighter:{show:false},
                    seriesDefaults:{
                        renderer:$.jqplot.BarRenderer,
                        rendererOptions:{
                            barMargin:0,
                            varyBarColor:true
                        },
                        yaxis:'y2axis',
                        showGridline:false,
                        shadow: false
                    },
                    grid:{
                        background:'#FFFFFF',
                        borderColor:'#FFFFFF',
                        shadow: false
                    },
                    axes:{
                        xaxis:{
                            ticks:["Messages    ", " Replies"],
                            renderer:$.jqplot.CategoryAxisRenderer,
                            tickOptions:{
                                markSize:0,
                                showGridline:false
                            }
                        },
                        y2axis:{
                            tickOptions:{
                                show:false,
                                formatString:'%d\%',
                                showGridline:false
                            }
                        }
                    }
                });

            }
        });
    });



