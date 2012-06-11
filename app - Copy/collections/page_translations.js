define([
    'tibbr'
    , 'models/page_translation'
]
    , function (Tibbr, PageTranslation) {
        return    Tibbr.PageTranslation = Tibbr.Collection.extend({
            className:"PageTranslation",
            model:PageTranslation
        });

    });