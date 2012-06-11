define([
    'order!jquery'
    , 'order!underscore'
    , 'order!tibbr'
    , "order!require/jqplot"
    , "order!require/jqplot-dateAxisRenderer"
    , "order!require/jqplot-highlighter"
    , "order!require/jqplot-pointLabels"
    , "order!require/jqplot-canvasTextRenderer"
    , "order!require/jqplot-canvasAxisLabelRenderer"
]
    , function ($, _, Tibbr) {
        return Tibbr.LineChartView = Tibbr.View.extend({
            initialize:function (options) {
                _.bindAll(this, 'render');
                this.divId = this.options.divId;
                this.data = this.options.data;
            },
            id:"myGrap",
            events:{},
            render:function () {
                this.renderGraph();
                return this;
            },

            renderGraph:function () {
                $.jqplot(this.divId, this.data, {
                    seriesColors:["#C1D82F", "#FF6600"],
                    seriesDefaults:{
                        yaxis:'y2axis',
                        showGridline:false,
                        lineWidth:2,
                        markerOptions:{
                            size:2
                        },
                        shadow:false
                    },
                    grid:{
                        background:'#FFFFFF',
                        borderColor:'#FFFFFF',
                        shadow: false
                    },
                    axes:{
                        xaxis:{
                            renderer:$.jqplot.DateAxisRenderer,
                            tickOptions:{
                                formatString:'%b&nbsp;%#d',
                                show:false,
                                showGridline:false
                            }

                        },
                        y2axis:{
                            tickOptions:{
                                show:false,
                                formatString:'%.0f',
                                showGridline:false
                            }
                        }
                    },
                    highlighter:{
                        show:true,
                        sizeAdjust:7.5
                    },
                    cursor:{
                        show:false
                    }
                });

            }
        });
    });



