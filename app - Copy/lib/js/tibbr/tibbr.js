/**
 * ALL The tibbr module
 */

define(['jquery'
    , 'underscore'
    , 'require/underscore-string'
    , 'backbone'
    , 'routes'
    , 'tmpl'
    , 'i18n!/app/nls/locale.js'
    , 'views/common/error'
]
    , function ($, _, _String, Backbone, routes, tmpl, i18n, Error) {
        var Tibbr = Tibbr || {};

        Tibbr.context = function () {
            return window.prefix || "/";
        };
        Tibbr.assert = function (assert) {
            return Tibbr.context().replace(/\/$/, "") + assert || "";
        };

        Tibbr.$ = $;
        Tibbr._ = _;

        Tibbr.debug = window._debug_ || false;

        Tibbr.init = function () {
            console.log("Start")
        };

        // assign i18n to tibbr
        Tibbr.i18n = i18n;

        //todo: make it working with html5 pushState
        Tibbr.pushState = function () {
            //for the moment by default its not pushState
            return false;
//            return typeof history.pushState == "function";
        };

        Tibbr.UI = {
            loader:'<img src="' + Tibbr.context() + 'images/line-loader.gif" width="116" height="42" class="line-loader" >',
            spinner:'<img src="' + Tibbr.context() + 'images/spinner.gif" width="16" height="16" class="spinner" >',
            spinnerSquare:'<img src="' + Tibbr.context() + 'images/loading_sm.gif" class="spinner-square" >'
        };

        window.spinner = Tibbr.UI.spinner;
        window.spinnerSquare = Tibbr.UI.spinnerSquare; //Can be used with non-white backgrounds where round spinner looks bad

        //
        Tibbr.qtipConfigs = {
            popup:function ($context) {

                return {
                    content:{
                        text:$('.qtip-content', $context)
                    },
                    position:{
                        my:'left top',
                        at:'right center',
                        viewport:$(window) // ...and make sure it stays on-screen if possible
                    },
                    show:{
                        //event: 'click',
                        solo:true // Only show one tooltip at a time
                    },
                    hide:'unfocus',
                    style:{
                        classes:'subject-user-snap ui-tooltip-wiki ui-tooltip-light ui-tooltip-shadow',
                        tip:{
                            corner:true,
                            mimic:false,
                            method:true,
                            width:10,
                            height:10,
                            border:true,
                            offset:0

                        }
                    }
                }
            },
            menu:function ($context) {
                var $tipContent = $('.qtip-content', $context),
                    $hideTargets = $('a', $tipContent).add('.q-tip', $context);

                return {
                    content:{
                        text:$tipContent
                    },
                    position:{
                        my:'top left',
                        at:'bottom center',
                        viewport:$(window) // ...and make sure it stays on-screen if possible
                    },
                    show:{
                        event:'click',
                        solo:true // Only show one tooltip at a time
                    },
                    hide:{
                        event:'click unfocus'
                    },
                    style:{
                        classes:'menu-tip ui-tooltip-light ui-tooltip-shadow',
                        tip:{
                            corner:true,
                            mimic:false,
                            method:true,
                            width:10,
                            height:10,
                            border:true,
                            offset:0

                        }
                    }
                }
            }
        };
        /**
         * help abort all the current ajax call
         */
        Tibbr.xhrPool = [];
        Tibbr.xhrPool.abortAll = function () {
            _.each(this, function (jqXHR) {
                jqXHR.abort();
            });
        };
        $.ajaxSetup({
            beforeSend:function (jqXHR) {
                Tibbr.xhrPool.push(jqXHR);
            }
        });


        /**
         * Tibbr translate  as rails translate t
         * usages: t("user.name"), t("user.status %s", "online")
         *
         */
        Tibbr.translate = function () {
            var args = Array.prototype.slice.call(arguments), key = args[0], _args = args.slice(1), mainkey = "i18n." + key;

            if ((_args || []).length > 0) {
                try {
                    _args.unshift(eval(mainkey));
                } catch (e) {
                    return key;
                }
//                console.log(_.vsprintf('The first 4 letters of the english alphabet are: %s, %s, %s and %s', ['a', 'b', 'c', 'd']));
                return _.sprintf.apply(null, _args);
            }
            else {
                try {
                    return eval(mainkey);
                } catch (e) {
                    return key;
                }
            }
        };

        /**
         * jquery template image tag
         */
        window._imageTag = function (value, options) {
           if(!_.isString(value)) return "<span>Image value should be string</span>";
            var context;
            if (value.match(/http|ftp|https/)) {
                context = "";
            } else if (value.charAt(0) == '/') {
                context = "";
            } else {
                context = Tibbr.context();
            }
            var src = context + value, img = $('<img />').attr("src", src);
            if (_.isObject(options)) img.attr(options);
            return $('<div>').append(img).html();

        };

        $.extend($.tmpl.tag, {
            'imageTag':{
                _default:{$2:"null" },
                open:"if($notnull_1){__=__.concat(_imageTag($1,$2));}"
            }
        });


        /**
         * Tibbr template with jquery tmpl
         */
        Tibbr.Template = function () {
            return {
                render:function (template, data) {
                    var oldT = window.t, tmpl;
                    window.t = Tibbr.translate;
                    tmpl = $.tmpl(template, data);
                    window.t = oldT;
                    return tmpl;
                }
            }

        };

        /**
         * Return tibbr server url best of tibbr_content
         * @param controller = controller_name
         * @param action  = action_name
         * @param id      =  Number user_id, message_id, subject_id
         */

        Tibbr.serverUrl = function (controller, action, id) {
            var url, generateURL = (function () {
                url = Tibbr.context() + controller;
                if (_.isNumber(id)) {
                    url = url + "/" + id;
                }
                if (action) {
                    url = url + "/" + action
                }
                return url;
            }());


            return url
        };
        /**
         * return tibbr client url base on html5 pushState
         * @param url  string url "/users/2"
         */
        Tibbr.url = function (url) {
            url = "/" + url;
            return Tibbr.pushState() ? url : "#" + url;
        };

        Tibbr.rootUrl = Tibbr.context;

        /**
         * return tibbr host url
         */
        Tibbr.host = function () {
            var loc = window.location,
                ulr = loc.protocol + "//" + loc.hostname;
            if (loc.port !== "") {
                ulr += ":" + loc.port;
            }
            return ulr + Tibbr.context();
        };

        /**
         * return tibbr client path
         * @param url  string url "/users/2"
         */
        Tibbr.path = function (url) {
            return  Tibbr.context() + url;
        };

        //to store data, currently using browser memory to store date
        Tibbr.Store = function () {

            this.data = [];
            this.reset = function () {
                this.data = [];
            };

            this.find = function (id, scope) {
                return _.find(this.data, function (obj) {
                    return (obj.scope === scope && obj.id === id)
                })
            };


            this.set = function (options) {
                var existed = this.find(options.id, options.scope)
                if (existed) {
                    this.data = _.reject(this.data, function (item) {
                        return item == existed
                    });
                }
                this.data.push(options);
            };

            this.get = function (id, scope) {
                return (this.find(id, scope) || {}).data;
            };
        };


        Tibbr.data = new Tibbr.Store();

        //Tibbr   separator:"__%__",
        Tibbr.separator = "__%__";

        //assign the routes to tibbr
        Tibbr.routes = routes;

        //Extend backbone model to tibbr.model
        Tibbr.Model = Backbone.Model.extend({
            dataSet:Tibbr.data,
            /**
             * return tibbr api url
             */
            _url:Tibbr.url,
            /**
             * return tibbr assert path
             */
            _path:Tibbr.path,
            /**
             * build model url base on baseName define in each model
             * return url
             */
            url:function () {
                if (!this.baseName) {
                    throw("Please provide a baseName  to the model:", this)
                }
                if (!this.id) return this.baseName;
                return this._path(this.baseName + (this.baseName.charAt(this.baseName.length - 1) == '/' ? '' : '/') + this.id);
            },
            /**
             *  call model  api action
             * @param action  String
             * @param type   read|update|create|delete
             * @param options  other ajax options
             */
            action:function (action, type, options) {
                options || (options = {});
                var model = this;
                var success = options.success;
                options.processData = true;
                options.url = this._path(this.baseName + (this.baseName.charAt(this.baseName.length - 1) == '/' ? '' : '/') + this.id + "/" + action);
                options.success = function (resp, status, xhr) {
                    if (!model.set(model.parse(resp, xhr), options)) return false;
                    if (success) success(model, resp);
                };
                return (this.sync || Backbone.sync).call(this, type, this, options);

            },
            get:function (attribute, defaultValue) {
                if (defaultValue == undefined)
                    defaultValue = "";
                var val = Backbone.Model.prototype.get.call(this, attribute);
                return val == null ? defaultValue : val;
            }
        });

        //Application Event
        Tibbr.Event = _.extend({}, Backbone.Events, {cid:"tibbr_event"});

        //Extend backbone view to tibbr view with template equals to Tibbr.template
        Tibbr.View = Backbone.View.extend({
            template:new Tibbr.Template(),
            dataSet:Tibbr.data,
            event:Tibbr.Event,
            t:Tibbr.translate,
            params:function () {
                return window._params_ || {}
            }
        });

        //Extend backbone collection to tibbr collection
        Tibbr.Collection = Backbone.Collection.extend({
            dataSet:Tibbr.data,
            event:Tibbr.Event,
            /**
             * generate tibbr server url
             * this.scope_id depend on the current scope user, messages or subject
             * this.scope_id can be number or string "Message|Message_id" : "message|2"
             */
            url:function () {
                var url = this._getTibbrUrl(), id = this._getUrlId();
                if (!url) return;
                return Tibbr.serverUrl(url.controller, url.action, id);
            },
            _getTibbrUrl:function () {
                return (typeof this.tibbrURL == "function") ? this.tibbrURL(this) : this.tibbrURL;
            },
            _getUrlId:function () {
                var id;
                if (this.scopeId === undefined) {
                    id = null;
                }
                else if (_.isNumber(this.scopeId)) {
                    id = this.scopeId;
                } else {
                    id = this.scopeId.split("|")[1]
                }
                return id;
            },
            _setPagination:function (options) {
                this.current_page = options.current_page;
                this.per_page = options.per_page;
                this.total_pages = options.total_pages;
                this.total_entries = options.total_entries;
                this.hasMorePages = options.total_pages > this.current_page;
                this.hasPreviousPage = this.current_page > 1
                this.nextPage = this.hasMorePages ? (this.current_page * 1) + 1 : null
                this.previousPage = this.hasPreviousPage ? (this.current_page * 1) - 1 : null
            },
            parse:function (data) {
                this._setPagination(data);
                this.fetched = true;
                //store in tibbr store
                if (!this.extraParams) this.dataSet.set({id:this.className, data:data, scope:this.scopeId})

                return data.items;
            },
            _set:function (data, options) {
                var models = data.items || []
                options || (options = {});
                this.each(this._removeReference);
                this._setPagination(data);
                this._reset();
                this.add(models, {silent:true});
                if (!options.silent) this.trigger('reset', this, options);
                return this;
            },
            setParams:function (options, reset) {
                if (reset || !this.dataParams) this.dataParams = {params:{page:1, per_page:10}}
                this.dataParams = _.extend(this.dataParams, options);
            },
            getParams:function (key) {
                return key ? (this.dataParams || {})[key] : (this.dataParams || {})
            },
            paginate:function (param, options) {
                if (param)
                    this.setParams(param, true)
                options = options || {};
                options['data'] = this.dataParams;
                options["append"] ? this.fetchMore(options) : this.fetch(options)
            },
            fetchMore:function (options) {
                options = options || {};
                var collection = this,
                    success = options.success;
                options.success = function (resp, status, xhr) {
                    _(collection.parse(resp, xhr)).each(function (item) {
                        if (!collection.get(item.id)) {
                            collection.add(item, {silent:true});
                        }
                    });
                    if (!options.silent) collection.trigger('reset', collection, options);
                    if (success) success(collection, resp);
                };
                return (this.sync || Backbone.sync).call(this, 'read', this, options);
            },
            /**
             * get data form tibbr store or fetch and store to tibbr database for the future use.
             * @param params, used for fetch with extra  params
             */
            getOrFetch:function (params) {
                // we need className and scope_id to find the data form tibbrStore
                if (!this.className && !this.scopeId) {
                    throw("Please provide a className function to the collection:", this)
                }
                var data;
                // call fresh call for extra params
                if (!params) {
                    data = this.dataSet.get(this.className, this.scopeId)
                } else {
                    this.extraParams = true;
                }
                if (data) {
                    this._set(data);
                } else {
                    this.fetch(params || {});
                }
            }
        });

        //Extend backbone routes to tibbr router
        // support for rails like patterns controller/id/action
        Tibbr.Router = Backbone.Router.extend({
            template:new Tibbr.Template(),
            dataSet:Tibbr.data,
            event:Tibbr.Event,
            routes:routes,
            /**
             * build params json object from arguments
             * @arg = arguments
             */
            tibbrParams:function (arg) {
                if ((arg || []).length === 0) {
                    this.params = {action:"index"};
                    return;
                }
                var args = arg[0].split("?"), action_id = (args[0] || "/index").split("/"),
                    paramString = (args[1] || "").split("&"), params = {};
                if (action_id.length > 1) {
                    params["action"] = action_id[1];
                    if (action_id[0])params["id"] = action_id[0];

                }
                else if (action_id.length === 1 && !_.isNaN(parseInt(action_id[0]))) {
                    params["action"] = "show";
                    params["id"] = action_id[0];
                }
                else {
                    params["action"] = action_id[0];
                }
                _.each(paramString, function (value) {
                    if (value) {
                        var param = value.split('=');
                        params[param[0]] = param[1];
                    }
                });

                this.params = window._params_ = params;
            }

        });


        Tibbr.Controller = Tibbr.Router.extend({
            routes:{},
            event:Tibbr.Event,
            initialize:function (arg) {
                this.tibbrParams(arg);
                try {
                    Tibbr.xhrPool.abortAll(); //aborting all going ajax call before chaning the page
                    this[this.params.action]();
                } catch (e) {
//                    console.warn(e.toString())
                    console.warn("Action not found", e)
                    new Error();
                }
            }
        });

        Tibbr.copyTextToClipboard = function (text) {

        };

        if (Tibbr.debug) {
            window.Tibbr = Tibbr;
        }

        return Tibbr;
    });

String.prototype.toInt = function () {
    return (this * 1);
}