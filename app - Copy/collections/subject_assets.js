define([
    "jquery"
    , "tibbr"
    , "models/asset"
]
    , function ($, Tibbr, Asset) {
        return Tibbr.SubjectAssets = Tibbr.Collection.extend({
            className: "subject_assets",
            model:Asset,
            tibbrURL:{controller:"users", action:"subject_assets"},
            load:function () {
                this.fetch(
                    {data:{params:{page:(this.current_page || 0) + 1, set_actions:true, per_page:5}
                    }
                    });
            }
        });
    });