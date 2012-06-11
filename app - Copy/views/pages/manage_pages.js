var tab_counter = 2;
define([
    'jquery'
    , 'underscore'
    , 'tibbr'
    , 'models/page'
    , 'text!templates/pages/manage_pages.html'
    , 'views/pages/page_link'
    , 'views/pages/new'
    , "modules/dialog"
    , 'views/pages/edit'
    , 'text!templates/pages/add_language.html'
    ]
    , function ($, _, Tibbr, Page,  managePages, PageView,AddPage, Dialog,EditPage, addLanguage) {
        return Tibbr.ManagePage = Tibbr.View.extend({
            className:"",
            events:{
                "click a#add_new_page":"addPage",
                "click .cancel-btn": "closeOverlay",
                "click .add-new-language a#language": "newLanguage",
                "click .edit-page-details span.ui-icon-close": "removeLanguage"
            },
            initialize:function () {
                _.bindAll(this, 'render');
                this.collection.bind('reset', this.render);
                
            },
            render:function () {
                $(this.el).html(this.template.render(managePages));
                var collection = this.collection, $ele = this.$(".pages-list");
                collection.each(function(page) {
                    var view = new PageView({
                        model:page,
                        id: "pages_list_li_" + page.get('id')
                    });
                    $ele.append(view.render().el);
                });
                return this;
            },
            addPage:function() {
                var $ele = this.$("#form_container");
                var view = new AddPage({
                    model:this.model
                });
                $ele.html(view.render().el);
                $('.pages-list li').removeClass("active");
                this.$('#new_page_form').validate();
                $(".edit-page-details").tabs();
                this.$(".pages-list").append($.tmpl($("#addPageTmpl").template(), this.model.toJSON()));
                this.$('#page_subject_id').val(this.model.id);
                $("#add_new_page").hide();
                $.colorbox.resize();
                return false;
            },
            closeOverlay:function(){
                $.colorbox.close();
                return false;
            },
            newLanguage:function(){
                this.$('#new_lang_subject_id').val(this.model.id);
                var $ele = this.$("#add_new_language");
                $ele.html(this.template.render(addLanguage, {
                    model:this.model
                }));
                $.colorbox.resize();
                this.$('.validate_new_lang_form').validate(
                {
                    submitHandler:function () {
                        var $tabs1 = $(".edit-page-details").tabs({
                            tabTemplate:"<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
                            add:function (event, ui) {
                                var tab_content = "<div id='add-language' class='page-details'><div class='page-details'><ul><li><label>Page name</label><input type='text' name='page[languages][" + $("#language-list1").val() + "][name]' class='text-box required' placeholder='Type page name' value='" + $("#page-name").val() + "'></li><li><label>URL</label><input type='text' name='page[languages][" + $("#language-list1").val() + "][url]' class='text-box required' placeholder='Type the page URL' value='" + $("#page-url").val() + "' /></li></ul></div></div>"
                                $(ui.panel).append(tab_content);
                            }
                        });
                        var tab_title = $("#language-list1 option:selected").text() || "Tab " + tab_counter;
                        $tabs1.tabs("add", "#add-language-" + tab_counter, tab_title);
                        $('#add-language-' + tab_counter).addClass('page-details');
                        tab_counter++;
                        $('.add-page-wrap').hide();
                        return false;
                    }
                }
                );
                return false;
            },
            removeLanguage:function(){
                $tabs = $(".edit-page-details").tabs();
                var index = $("li", $tabs).index($(this).parent());
                $tabs.tabs("remove", index);
                return false;
            }

        });
    });