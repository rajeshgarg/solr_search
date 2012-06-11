define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'collections/recent_subjects'
    , 'collections/popular_subjects'
    , 'views/subjects/recent_list'
    , 'views/subjects/popular_list'
    , 'text!templates/home/right_nav.html'
]
    , function ($, _, Tibbr, RecentSubjects, PopularSubjects, RecentSubjectListView, PopularSubjectListView, rightHtml) {
        return Tibbr.HomeRightNav = Tibbr.View.extend({
            initialize:function () {
                _.bindAll(this, 'render');

            },
            render:function () {
                this.$el.html(this.template.render(rightHtml));
                var collection = new RecentSubjects(),
                    subjectListView = new RecentSubjectListView({header:"Recently Created Subjects", collection:collection });
                if(collection.length > 0 ) this.$(".recent-subjects").append(subjectListView.render().el);
                collection.fetch({data:{params:{per_page:3}}});
                var popCollection = new PopularSubjects(),
                    popListView = new PopularSubjectListView({header:"Popular Subjects", collection:popCollection });
                popCollection.scopeId = Tibbr.currentUser.id;
                popCollection.parse = function (data) {
                    return _.map(data,
                        function (item, index) {
                            var it = item.facet;
                            it.popular_index = data.length - index;
                            return it;
                        }).reverse();
                };
                this.$(".popular-subjects").append(popListView.render().el);
                popCollection.fetch({data:{params:{per_page:8}}})
              return this;
            }
        });
    });