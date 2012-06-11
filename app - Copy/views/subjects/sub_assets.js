define([
  'jquery'
  , 'underscore'
  , 'tibbr'
  , 'text!templates/subjects/sub_assets.html'
  , 'views/subjects/subject_assets'
  ]
  , function ($, _, Tibbr,SubjectAssets, AssetView) {
    return Tibbr.SubjectAssetView = Tibbr.View.extend({
      initialize:function () {
        _.bindAll(this, 'render');
       this.collection.bind('reset', this.render);
      },
      render:function () {
        $(this.el).html(this.template.render(SubjectAssets, {model:this.model, collection:this.collection}));
        var assets_collection = this.options.collection, $ele = this.$('#files');
         assets_collection.each(function (asset) {
                    var view = new AssetView({
                        model:asset,
                        collection:assets_collection
                    });
                    $ele.append(view.render().el);
              })
              return this;
      }

    });
  });