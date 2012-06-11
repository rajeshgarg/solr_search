define([
    "underscore"
    , "tibbr"
    ,"collections/page_translations"
    ]
    , function (_, Tibbr, PageTranslations) {
        return Tibbr.Page = Tibbr.Model.extend({
            baseName:"pages",
            defaults: {
                modelType: "Page",
                "translations":[]
            },
            editUrl:function () {
                return this._url("pages/" + this.id + "/edit");
            },
            destroy:function () {
                var self = this;
                this.action("", "delete", {data:{params:{id:this.get('id'),format:"json"}},
                    complete:function (data) {
                        if (data.status === 200) {
                            self.trigger("delete");
                        }
                    }
                });
            },
            build:function(){
                if (this.get('translations')) {
                    this.translations = new PageTranslations(this.get("translations"));
                }
            }
        });
    });
