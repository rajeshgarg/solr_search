define([
    'jquery'
    , 'underscore'
    , 'backbone'
    , 'tibbr'
    , 'controllers/application'
    , 'models/application_definition'
    , 'collections/application_definitions'
    , 'collections/application_instances'
    , 'views/common/tabs'
    , 'views/events/stream_list'
    , 'views/events/configuration'
],

    function ($, _, Backbone, Tibbr, Application, ApplicationDefinition, ApplicationDefinitions, ApplicationInstances, TabsView, StreamList, configurationView) {
        return Tibbr.EventsController = Tibbr.Controller.extend({
                index:function () {
                    Application.leftNavigation(Tibbr.currentUser, false);
                    this.setTabs(this.tabIndex || 0);
                    var collection = new ApplicationDefinitions(), view, self = this;
                    view = new StreamList({collection:collection, type:self.type || "server"});
                    $("#tab-content").html(view.render().el);
                    collection.getOrFetch();

                },
                life:function () {
                    this.tabIndex = 1;
                    this.type = "client";
                    this.index();
                },
                configuration:function () {
                    Application.leftNavigation(Tibbr.currentUser, false);
                    new ApplicationDefinition({id:this.params.id}).fetch({ data:{params: {set_actions: true}},success:function (data) {
                        var instances = new ApplicationInstances();
                        instances.fetch({data:{"application_definition_id":data.id}, success:function (collection, resdata) {
                            $("#content").html(new configurationView({model:data, instances:instances, definition: data}).render().el);
                            instances.reset(resdata)
                        }});

                    }});
                },

                setTabs:function (activeIndex) {
                    var tabModel = {
                        activeIndex:activeIndex,
                        tabs:[
                            {
                                name:"Work Streams",
                                url:Tibbr.url("events/")
                            },
                            {
                                name:"Life Streams",
                                url:Tibbr.url("events/life")
                            }
                        ]
                    };
                    $('#content').html(new TabsView({settings:tabModel}).render().el);


                }
            }
        );
    });