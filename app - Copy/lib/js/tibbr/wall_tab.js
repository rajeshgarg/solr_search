define(["order!jquery", "order!require/jquery-ui", "underscore", "tibbr"], function ($, $UI, _, Tibbr) {
    return Tibbr.WallTab = function ($) {

        var counter, content = "", id = "wall-tabs", $tabs, currentIndex,
            add = function (options) {
                $tabs = defaultTemplate($tabs, options.close !== false);
                content = options.content;
                $tabs.tabs("add", "#" + id + "-" + counter, options.title || "Tibbr Tab " + counter).tabs("select", currentIndex);
                counter++;
                return counter - 1;
            },
            addEvents = function (aTabs) {
                $tabs = defaultTemplate($tabs, false);
                $.each(aTabs, function (i, v) {
                    content = v.content;
                    $tabs.tabs("add", "#event" + _.dasherize(v.name), v.name)
                })
            },
            remove = function () {
            },
            show = function (index) {
                $("#" + id).tabs("select", index);
            },

            defaultTemplate = function (tabs, displayClose) {
                var close = displayClose ? "<span class='ui-icon ui-icon-close'>Remove Tab</span>" : "";
                return  tabs.tabs({
                    tabTemplate:"<li><a href='#{href}'>#{label}</a> " + close + "</li>",
                    add:function (event, ui) {
                        currentIndex = ui.index;
                        $(ui.panel).append($("<p style='margin:0px;'></p>").append(content));
                    }
                })
            },
            iframe = function (src, height) {
                if (height == undefined) {
                    height = 500;
                }
                return '<iframe id="iframe' + id + counter + '" name="iframe' + id + counter + '" src = " ' + src + '" frameBorder="0" border="0" style="visibility:visible;overflow: auto;width:100%;border:0px;height:' + height + 'px;" src="about:blank"></iframe>'
            },
            zoomHeader = function () {
                return "<div id=\"expand-icon-wrap\" class=\"expand-icon-wrap\"><a href=\"#\" id=\"expand-icon\" class=\"expand-icon\">X</a></div>"
            }
            ,
            addWithIframe = function (options) {
                var $content = "";
                if (options.zoomView) {
                    $content = zoomHeader();
                }
                return add({title:options.title, content:$content + iframe(options.src, options.height), close:options.close});
            },
            init = function (_id) {
                id = _id;
                var tabs = $("#" + id);
                tabs.tabs({cache:true});
                $tabs = defaultTemplate(tabs, true);
                tabs.find("span.ui-icon-close").live("click", function () {
                    var index = $("li", $tabs).index($(this).parent());
                    $tabs.tabs("remove", index);
                });
                counter = tabs.tabs("length") + 1;
            };

        return {
            add:add,
            init:init,
            addEvents:addEvents,
            addWithIframe:addWithIframe
        }
    }($)
});