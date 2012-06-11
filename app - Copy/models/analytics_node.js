define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.AnalyticsFrontNode = Tibbr.Model.extend({
            baseName:"analytics_f_node",
            initialize:function () {
                _.bindAll(this);
            },
            cNodes: function(){
              return this.get('c_nodes');
            }

        });
    });