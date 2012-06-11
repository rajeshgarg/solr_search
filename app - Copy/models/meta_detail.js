define(['jquery',
    "underscore"
    , "tibbr"
]
    , function ($, _, Tibbr) {
        return Tibbr.MetaDetail = Tibbr.Model.extend({
            defaults:{modelType:"MetaDetail"},

            initialize:function (options) {
                this.options = options || {}
            },

            fetch:function (url, options) {
                this.url = url;
                Tibbr.Model.prototype.fetch.call(this, options);
            },

            parse:function (data) {

                if (_.isObject(this.options.extraData)) data.unshift(this.options.extraData);
                var _obj = {}, model = this, attributes = model.options.attributes;
                if (!_.isEmpty(attributes)) model.attributes = attributes;
                data.sort(function (a, b) {
                    if (a.position > b.position) return 1;
                    if (b.position > a.position) return -1;
                    return 0;
                });
                _.each(data, function (d) {
                    if (d.position === 0) {
                        return
                    }
                    var type = "_" + d.ui_type;
                    _obj[d.key] = {
                        'title':d.label,
                        'type':_(type).camelize(),
                        'required':d.required,
                        'disabled':d.editable === false
                    };

                    if (_.isEmpty(attributes)) if (d['default']) model.set(d.key, d['default'], {silent:true});
                    if (d['multi_value']) {
                        _obj[d.key].multiValue = true;
                        if (!_.isEmpty(attributes)) {
                            model.set(d.key, attributes[d.key].split(Tibbr.separator), {silent:true});
                        }
                    }
                    if (d['has_dependents']) {
                        _obj[d.key].hasDependents = true;
                        _obj[d.key]["cssClass"] = "has_dependents";
                    }
                    if (d['dependency']) {
                        _obj[d.key].dependency = d['dependency'];
                        _obj[d.key]["cssClass"] = "dependency I V".replace("I", d.dependency[0].id).replace("V", d.filter_value.toLowerCase())
                    }
                    if (d['filter_value']) _obj[d.key].filterValue = d['filter_value'];

                    if (d.allowed_values)  _obj[d.key].options = _.map(d.allowed_values, function (v) {
                        return {val:v.id, label:v.value}
                    });
                    if (d.required) {
                        _obj[d.key].validators = ["required"]
                    }

                });


                this.schema = _obj;
                if (!_.isEmpty(attributes)) {
                    var subjects = attributes.subjects, users = attributes.users;
                    if (subjects && _obj.subjects !== undefined) {
                        if (_.isString(subjects))   subjects = subjects.split(Tibbr.separator);
                        _obj.subjects.options = _.map(subjects,
                            function (v) {
                                return "<option value='V' selected='selected' class='selected'>V</option>".replace(/V/g, v)
                            }).join("");
                        model.set("subjects", _obj.subjects.options, {silent:true})
                    }
                    if (users && _obj.users !== undefined) {
                        if (_.isString(users))   users = users.split(Tibbr.separator);
                        _obj.users.options = _.map(users,
                            function (v) {
                                return "<option value='V' selected='selected' class='selected'>V</option>".replace(/V/g, v)
                            }).join("");
                        model.set("users", _obj.users.options, {silent:true})
                    }

                }
                console.log(attributes)
                return data;
            }
        });
    });
