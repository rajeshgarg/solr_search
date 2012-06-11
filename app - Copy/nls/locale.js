define({"root":{
    "locale":"en",
    "name":"English",
    "defaults":{
        date:{     //todo: remove split, refactor ordinal, relativeTime example , index of %s
            "months":"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
            "monthsShort":"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
            "weekdays":"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            "weekdaysShort":"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
            "longDateFormat":{
                "L":"MM/DD/YYYY",
                "LL":"MMMM D YYYY",
                "LLL":"MMMM D YYYY h:mm A",
                "LLLL":"dddd, MMMM D YYYY h:mm A"
            },
            "meridiem":{
                "AM":'AM',
                "am":'am',
                "PM":'PM',
                "pm":'pm'
            },
            "relativeTime":{
                future:"in %s",
                past:"%s ago",
                s:"a few seconds",
                m:"a minute",
                mm:"%d minutes",
                h:"an hour",
                hh:"%d hours",
                d:"a day",
                dd:"%d days",
                M:"a month",
                MM:"%d months",
                y:"a year",
                yy:"%d years"
            },//todo: refactor ordinal
            ordinal:function (number) {
                var b = number % 10;
                return (~~(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            }
        },
        validation:{
            "required":"This field is required.",
            "remote":"Please fix this field.",
            "email":"Please enter a valid email address.",
            "url":"Please enter a valid URL.",
            "date":"Please enter a valid date.",
            "dateISO":"Please enter a valid date (ISO).",
            "number":"Please enter a valid number.",
            "digits":"Please enter only digits.",
            "creditcard":"Please enter a valid credit card number.",
            'equalTo':"Please enter the same value again.",
            "accept":"Please enter a value with a valid extension.",
            "maxlength":"Please enter no more than {0} characters.",
            "minlength":"Please enter at least {0} characters.",
            "rangelength":"Please enter a value between {0} and {1} characters long.",
            'range':"Please enter a value between {0} and {1}.",
            "max":"Please enter a value less than or equal to {0}.",
            'min':"Please enter a value greater than or equal to {0}."
        }
    },
    "announcement":{
        "announcements": "Announcements",
        "votes":"votes",
        "see_more_options":"See More Options",
        "ask_question_total_vote": "Total Votes",
        "remove":"Remove",
        "delete_alert": "Are you sure you want to delete the announcement?"
    },
    "user":{
        "name":"Name",
        "first_name":"First Name",
        "last_name":"Last Name",
        "email":"Email",
        "phone":"Phone",
        "company":"Company",
        "department":"Department",
        "title":"Title",
        "job_title":"Job Title",
        "location":"Location",
        "mobile":"Mobile",
        "office":"Office",
        "about_me":"About Me",
        "time_zone":"Time Zone",
        "my_profile":"My Profile",
        "profile":"Profile",
        "upload_photo":"Upload Photo",
        "edit_profile":"Edit Profile",
        "change_password":"Change Password",
        "edit_my_profile":"Edit My Profile",
        "followers":"Followers: <span>%d</span>",
        "following":"Following: <span>%d</span>",
        "people_name":"People Name",
        "people":"People",
        "self":"Self",
        "feed_notification":"Email Alerts",
        "feed_notification_msg":"Receive email alerts when there are new posts on the subjects or from the people you follow.",
        "edit_subscription":"Set Up Alerts",
        "actions":{
            "unfollow":"Unfollow", "follow":"Follow"
        },
        "channels":{
            "activate_email_subscription":"Activate Your Email Subscription",
            "register_email_address":"Register Your Email Address",
            "email":"Email:",
            "activation_code":"Activation Code:",
            "create_email_alert":"You are about to create an email-alert. Follow these steps:",
            "step_one":"In the Email field, type your email address for alerts and click Enter.",
            "step_two":"In the Activation Code field, type the activation code in the email message you will receive from tibbr. Click Enter.",
            "step_three":"tibbr will confirm activation of your new email-alert on screen. Specify your alert option and click Save.",
            "channel_one":"Click Add New and follow the on-screen steps.",
            "channel_two":"Click View to review the email-alert schedule.",
            "channel_three":"Click Schedule to edit the email-alert schedule.",
            "view":"View",
            "schedule":"Schedule",
            "activate":"Activate",
            "delete":"Delete",
            "email_alert_options":"You are now editing the email-alert options for",
            "apply_all":"Apply to All",
            "notify_me":"Notify me if someone posts a message to me:",
            "name":"Name",
            "cancel":"Cancel"
        },
        "own_post": "%1$s's Posts",
        "wall": "%1$s's Wall",
        "about": "About",
        "my_posts": "My Posts",
        "my_likes": "My Likes"
    },
    "upload_photo":{
        "select_image":"Select an image from your computer",
        "no_file_chosen":"No file chosen",
        "supported_formats":"tibbr supports GIF, JPEG, and PNG formats",
        "or":"Or",
        "use_default_image":"Use default image",
        "upload_a_photo":"Upload a Photo",
        "save_button":"Save",
        "cancel_button":"Cancel"
    },
    "change_password":{
        "change_password":"Change Password",
        "current_password":"Current Password",
        "new_password":"New Password",
        "verify_new_password":"Verify New Password"
    },
    "subject":{
        "wall": "Subject Wall",
        "see_more":"See More",
        "Description":"Description",
        "follow":"Follow",
        "follower":"Follower",
        "replies":"Replies",
        "messages":"Messages",
        "following":"Following",
        "Messages":"Messages",
        "broadcast":"Broadcast",
        "description":"Description",
        "membership":"Membership",
        "actions":{
            "edit":"Edit", "delete":"Delete", "play":"Play", "pause":"Pause", "unsubscribe":"Unfollow", "subscribe":"Follow", "move":"Move"
        },
        "trends":{
            "subject_trends": "Subject Trends",
            "trends": "Trends",
            "hot_topics": "Hot Topics",
            "messages": "Messages",
            "replies": "Replies",
            "see_more": "See more"
        },
        "recently_created_subjects":"Recently Created subjects",
        "created_by":"Created By",
        "created_at":"Created At",
        "you_are_following":"You are following",
        "subjects":"subjects",
        "subjects_i_own":"Subjects I own",
        "subject_name":"Subject Name",
        "name":"Name",
        "action":"Action",
        "on":"on",
        "owner":"Owner",
        "subject_follower":"Subject Followers",
        "delete":{
            "conformation":"Are you sure you want to delete this subject?"
        },
        "find_follower":{
            "view_follower_list":"View Follower List",
            "find_people":"Find People" ,
            "close":"Close"
        } ,
        Notifications:{
            "notifications":"Notifications" ,
            "email":"Email"
        } ,
        "assign_subject_owner":{
            "assign_owners_for_the_subject":"Assign Owners for the Subject",
            "subject":"Subject",
            "users":"Users",
            "assign_users":"Assign Users",
            "add":"Add",
            "currently":"Currently",
            "users_are_in_this_role":"users are in this role"
        },
        invite_people:{
            "share_subject":"Share This Subject with Your Colleagues",
            "find_people":"Find People" ,
            "email_address":"Email Address",
            "add_more":"Add More",
            "add_personal_message":"Add a Personal Message"
        },
        search_messages:{
            "findMessages": "Looking for something in this subject?",
            "search_within_subject": "Search within subject" ,
            "who_posted_it": "Who posted it?",
            "when_posted_it": "When was it posted?",
            "between": "Between",
            "message_type": "What is the message type?",
            "file": "File",
            "poll": "Poll",
            "calendar": "Calendar" ,
            "link": "Link",
            "advanced_options": "Advanced Options" ,
            "find": "Find"
         },
        "subject_owners":"Subject Owners" ,
        "subject_owner":"Subject Owner" ,
        "sub_subjects":"Sub-Subjects",
        "right_nav": {"poll": "Polls", "links": "Links", "assets": "Files"}

    },
    "actions":{
        "msg_reply":"Reply", "delete":"Delete", "unlike":"Unlike", "like":"Like", "star":"Star", "unstar":"Un Star",
        "mute":"Mute", "unmute":"Un Mute", "global_announcement":"Global Announcement", "email":"Email", "add":"Add",
        "copy_link":"Copy Link"
    },
    "common":{
        "yes":"Yes",
        "no":"No",
        "cancel":"Cancel",
        "close":"close",
        "preview":"Preview",
        "url":"URL",
        status:{"post":"Post", "poll":"Poll", "calender":"Calender" },
        "followers":"Followers",
        "following":"Following",
        "start_typing":"Start typing to select from list ...",
        "please_select_subject":"Please select subjects or users to post a message.",
        "please_select_privateUser":"Please select users to post a private message.",
        "result_not_found":"Result not found for :",
        "no_found_results":"No results found for",
        "unknown":"unknown",
        "no_file_chosen":"No File Chosen",
        "right_bar":{
            "user_follower":"%1$s's %2$s",
            "recently_created_subjects":"Recently Created Subjects",
            "popular_subjects":"Popular Subjects"
        },
        "post":{
            "what_going_on":"What's going on?",
            "poll_options":["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            "placeholder":"Add an option...",
            "calender":{
                "what_are_you_planing":"what are you planning?",
                "when":"When",
                "duration":"Duration",
                "where":"Where",
                "more_details":"More Details",
                "show_guest_list":"Show the guest list for this event",
                "create_event":"Create Event",
                "start_hour":["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
                "start_minutes":["00","15","30","45"],
                "duration_hours": ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"],
                "duration_minutes":["00","10","20","30","40","50"]
            }
        },
        asset:{
            "attach":"Attach",
            "file":"File",
            "link":"Link",
            "attach_file":"Attach a File",
            "choose_file_from_computer":"Choose a file from the file system on your computer.",
            "choose_file":"Choose File",
            "no_file_chosen":"No file chosen",
            "attach_link":"Attach a Link",
            "link_title":"Title (Optional)"
        },
        hints:{
            choose_subject_list:"Choose subjects from the list of subjects",
            choose_user_list:"Choose users from the list of users",
            choose_group_list:"Choose groups from the list of groups"
        }
    },
    "message":{
        "message":"Message",
        "post_to":"Post To",
        "replay":"Reply",
        "like":"Like",
        "more":"More",
        "delete":"Are you sure you want to delete this post?",
        "mute":"Are you sure you want to mute this post?",
        "copy_link_title": "Following link is copied to your clipboard.",
        "like_to":{
            "you":"<a class='you-like'>You </a> like this ",
            "one":"<a class='you-like' href='%s'>%s </a> likes this ",
            "you_and_one":"<a class='you-like'> You </a> and  <a class='you-like' href='%s'>%s</a> likes this ",
            "you_and_more":"<a class='you-like'> You </a>, <a class='you-like' href='%s'>%s</a> and <a class='user-menu-popup' href='#'>%d more</a> like this ",
            "two":" <a class='you-like'> %s </a> and <a class='you-like' href='%s'>%s</a> likes this ",
            "more":" <a class='you-like'>%s</a>, <a class='you-like' href='%s'>%s</a> and <a class='user-menu-popup' href='#'>%d more </a>like this ",
            "like":" Like ",
            "unlike":" Unlike "},
        "email":{
            "title":"Email this post to your colleagues",
            "find_people":"Find People",
            "add_people":"Add a personal message"
        },
        "action":{"add":"Add", "email":"Email", "copy_link":"Copy Link", "mute":"Mute"},
        "go_to_link":"Click here to go to %s",
        "show_all_replies":"Show all %d replies",
        "collapse_replies":"Collapse replies",
        "errors":{
            "can_not_blank":"Content should not be empty"
        }
    },
    "my_people":{
        "following":{"header":"following", "text":'You are following <span class="count">%d</span> people' },
        "followers":{"header":"followers", "text":'You have <span class="count">%d</span> followers' },
        "name":"Name",
        "action":"Action"
    },
    "explore":{
        "people":{
            "people_directory":{
                "list_tab":"List View",
                "hierarchy_tab":"<span>Hierarchy View</span>",
                "all":"All",
                "self":"Self",
                "popup_room":"Room",
                "popup_O":"(O)",
                "popup_M":"(M)",
                "office":"Office"
            }
        }
    },
    "application_definition":{
        "released":"Released",
        "configure":"Configure",
        "disable":"Disable",
        "enable":"Enable",
        "actions":{"disable":"tibbr has disabled your %s stream.", "enable":"tibbr has enabled your %s stream. See the link under My Streams on your home page"},
        "configuration":{"header":"Configure %s Stream to subjects", "account":"tibbr allows you to track relevant changes to your %s accounts.",
            "connection":"You can now make a new connection to your %s account or customize the %s accounts on tibbr.",
            "create_account":"Create or View your %s history", "add_channel":"Add a New %s Channel", "edit_channel":"Edit Channel %s","current_channel":"Current %s Channel"
        }
    },
    "event":{
        "description":'<h3>Configure %s streams to subjects</h3><p>You can configure %s feeds and map them to subjects.</p><p class="manage-feed-wrap">Create or Manage your %s instances.</p>',
        "title":"Configure %s Streams to Subjects",
        "title_desc":"You can configure %s feeds and map them to subjects.",
        "sub_title":"Create Or Manage Your %s Instances",
        "channel":"%{name} Instance",
        "status":"Status",
        "action":"Action",
        "form":{
            "subject":"<strong>Map messages to subjects:%s </strong>The followers of the subjects will receive the updates on tibbr.",
            "user":"<strong>Map messages to users:%s</strong>The selected users will receive the updates on tibbr.",
            "password_edit_label":"  ( leave this blank if you don't want to change it )",
            "add":"Add New Channel"
        },
        "instance":{
            "new":"Add Instance",
            "edit":"Edit",
            "editing":"Editing...",
            "delete":{ "conformation":"Are you sure you want to delete this instance?"},
            "success":{
                "update":"tibbr has updated the instance %s.",
                "create":"tibbr has created the instance %s."
            },
            "status":{
                "disabled":"You have disabled this instance.",
                "progress":"This instance is running.",
                "error":"This instance contains errors."},
            "stream":{"name":"Stream",
                "map_to":"Map to",
                "title":"Event Streams",
                "work":"Work Streams",
                "life":"Life Streams",
                "utilities":"Utilities",
                "updates":"Updates",
                "new":"Add Stream",
                "edit":"Edit Stream",
                "delete":{
                    "conformation":"Are you sure you want to delete this stream?"}
            }
        }
    },
    "home":{
        "my_wall":"My Wall",
        "filters":{
            "defaults":[
                {"type":"my_wall", "name":"My Wall"},
                {"type":"all_post", "name":"All Posts"},
                {"type":"private", "name":"Private Messages"},
                {"type":"star", "name":"Starred Messages"},
                {"type":"question", "name":"Polls"},
                {"type":"chat", "name":"Chat History"}
            ],
            "my_stream":"My Stream",
            "my_filters":"My Filters"
        }
    },
    "manage_pages":{
            "manage_pages_link": "Manage Pages",
            "manage": {
                "manage_your_pages": "Manage Pages",
                "click_on_page": "Click the page you want to edit",
                "add_new_page": "Add Page",
                "new_page": "New Page",
                "current_list": "Current List:",
                "add_language": "Add Language"
            },
            "delete":
            {
                "success": "tibbr has deleted specified page.",
                "confirm": "Do you want to delete the page %{name}?",
                "lang_confirm": "Do you want to delete the language %{name}?",
                "lang_success": "tibbr has deleted language."
            },
            "form":
            {
                "name": "Page Name",
                "url": "URL",
                "select_language": "Choose Language",
                "default_locale": "Default",
                "add_new_language": "Add",
                "add_button": "Save",
                "type_name": "Type the page name",
                "type_url": "Type the page URL",
                "choose_lang": "Please choose language",
                "errors":{
                    "blank": "can't be empty"
                },
                "updated_successfully": "tibbr has made the updates you specified",
                "created_successfully": "tibbr has created the subject page you specified.",
                "added_language": "tibbr has added language details",
                "add_new_lang_hoover": "Click save to enable this link"
            }
        },
    dialog:{
        "title":"TIBCO tibbr ",
        "common":{
            "ok":"OK",
            "cancel":"Cancel"
        },
        "remove":{
            "ok":"Yes",
            "cancel":"No"
        }
    }},  //todo: reload all
    
    "fr-fr":true,
    "np":true
})
;