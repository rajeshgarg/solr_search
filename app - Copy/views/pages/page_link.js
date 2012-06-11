define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/page'
    , 'text!templates/pages/page_link.html'
    , 'views/pages/edit'
     , "modules/dialog"
]
    , function ($, _, Tibbr, Page, pageList, EditPage, Dialog) {
        return Tibbr.PageLink = Tibbr.View.extend({
            tagName:"li",
            initialize:function () {
                _.bindAll(this, 'render','deletePage');
                this.model.on('destroy', this.remove, this);
            },
            events:{
                "click ul.pages-list a.page": "editPage",
                "click ul.pages-list img.confirm_link_image": "deletePage"
            },
            render:function () {
                $(this.el).html(this.template.render(pageList, {model:this.model}));
                return this;
            },
            editPage:function(event){
                var $ele = $("#form_container");
                var $elem = $(event.target);
                if ($elem.attr('id') == undefined) {
                    return false;
                }
                else {
                    $('.pages-list li').removeClass("active");
                    $('#pages_list_li_new_page').remove();
                    $elem.parent().addClass("active");

                    $("#add_new_page").show();
                    var page = new Page({
                        id:$elem.attr('id')
                    });
                    page.fetch();
                    var view = new EditPage({
                        model:page
                    });
                    $ele.html(view.render().el);
                    $('#edit_page_form').validate();
                    $('#page_subject_id').val(this.model.id);
                    return false;
                }
            },
            deletePage:function(event){
                var $ele = $(event.target);
                if ($ele.data('url') == '#') {
                    $("#form_container").html("");
                    $("#pages_list_li_new_page").remove();
                    $("#page_message").html('');
                    $("#add_new_page").show();
                    return false;
                }
                else {
                    var page = new Page({
                        id:$ele.data('id')
                    });
                    page.fetch();
                    Dialog.remove({
                        text:$ele.data('message'),
                        okFunction:function () {
                            page.destroy($ele);
                        }
                    })
                    //                    Dialog.remove({
                    //                        text:$ele.data('message'),
                    //                        url:$ele.data("url"),
                    //                        onComplete:function (data) {
                    //                            if (data.remove) {
                    //                                $("#form_container").html("");
                    //                                $("#pages_list_li_" + data.id).remove();
                    //                                $("#page_message").html(data.html);
                    //                                var $wallTabs = $('#wall-tabs').tabs();
                    //                                var tabId = $("a[href='#wall-tabs-page-" + data.id + "']");
                    //                                if (tabId.length > 0) {
                    //                                    var index = $('li', $wallTabs).index(tabId.parent());
                    //                                    $wallTabs.tabs('remove', index);
                    //                                }
                    //                            } else {
                    //                                Dialog.alert(data.errors);
                    //                            }
                    //                        }
                    //                    });
                    $("#add_new_page").show();
                    return false;
                }
            }
        });
    });