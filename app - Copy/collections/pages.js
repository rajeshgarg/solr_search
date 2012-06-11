define([
    'tibbr'
    , 'models/page'
    ]
    , function (Tibbr, Page) {
        return    Tibbr.pages = Tibbr.Collection.extend({
            className:"pages",
            tibbrURL:{
                controller:"pages"
            },
            model:Page,
            load:function (subject_id) {
                this.fetch(
                {
                    data:{
                        subject_id: subject_id,
                        params:{
                            page:(this.current_page || 0) + 1,
                            set_actions:true,
                            per_page:10
                        }
                    }
                });
            }
        });
    });