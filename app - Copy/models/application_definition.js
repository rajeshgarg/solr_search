define([
    "underscore"
    , "tibbr"
    , 'require/moment'
]
    , function (_, Tibbr, moment) {
        return Tibbr.ApplicationDefinition = Tibbr.Model.extend({
            baseName:"application_definitions",
            actions:function () {
                return (this.get("actions") || "").split(",")
            },
            initialize:function () {
                _.bindAll(this, "icon", "configUrl", "releasedAt", "button", 'canCreate', 'actions', 'canEnable', 'isSubscribe')
            },
            icon:function () {
                return this.get("name").replace(/\s/g, "_").replace("®", "").toLowerCase() + "-feed.jpg";
            },
            releasedAt:function () {
                return moment(this.get("created_at")).format('MMMM Do YYYY');
            },
            configUrl:function () {
                return this._url("events/" + this.id + "/configuration");
            },
            button:function () {
                var type = this.get('app_type'), res, status = this.get("status"), t = Tibbr.i18n.application_definition;
                if (type === "server") {
                    res = {url:this.configUrl(), text:t.configure}
                } else {
                    res = {url:"#", text:(status === "active") ? t.disable : t.enable}
                }
                return res;
            },
            canCreate:function () {
                var max_instance_check = this.get('max_instance') === 0 || (this.get('max_instance') >= 1 && this.get('instances_count') < this.get('max_instance')) ,
                    max_instance_per_user_check = this.get('max_instance_per_user') === 0 || (this.get('max_instance_per_user') >= 1 && this.get('instances_count') < this.get('max_instance_per_user'));
                return max_instance_check && max_instance_per_user_check
            },

            canEnable:function () {
                return _.include(this.actions(), 'subscribe') || _.include(this.actions(), 'unsubscribe');
            },

            isSubscribe:function () {
                return _.include(this.actions(), "unsubscribe")
            },
            updateActions:function () {

                var type = this.isSubscribe() ? "unsubscribe" : "subscribe", self = this, actions = self.get('actions');
                self.action(type, "update", {data:{params:{set_actions:true}}, success:function (data) {
                    //todo: this set could be done by server
                    if (type === "unsubscribe") {
                        self.set("actions", actions.replace("unsubscribe", "subscribe"), {silent:true})
                    } else {
                        self.set("actions", actions.replace("subscribe", "unsubscribe"), {silent:true});
                    }
                    self.trigger("action:change", type)
                }})
            }
        });
    });
