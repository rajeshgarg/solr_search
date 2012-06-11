define([
    'jquery'
    , 'jasmin_jquery'
    , 'tibbr'
    , 'models/subject'
    , 'views/subjects/subject_left_nav'
    , "collections/users_search"
    , "collections/subjects_hierarchy_child"
    , 'collections/channels'
    , 'fixtures/subjects'
    ]
    , function ($, J$, Tibbr, Subject, SubjectLeftNavView,UserSerch,subSubject,Channels, fixture) {

        describe("SubjectLeftNavView", function () {

            beforeEach(function () {
                var subject = new Subject(fixture[0]);
                var subjectFirst = fixture[1];
                var subjectSecond = fixture[2]; 
                var subSubjectList = new subSubject([subjectFirst, subjectSecond]);
                var peopleList = [{"json_class":"User","activated_at":"2012-02-09T22:30:15+13:00","broadcast":true,"city":null,"company":null,"country":null,"created_at":"2012-02-09T22:30:15+13:00","deleted":false,"department":"DEvelopment","description":"gooogggggggggggggggleeeeeeeeeeee","domain":null,"email":"tibbr-support@tibco.com","exclude_wall_mtypes":"chat,application:Email","first_name":"TIBBR","id":3,"last_message_id":30,"last_name":"Admin","last_read_message_id":0,"locale":null,"login":"tibbradmin","manager":null,"private_profile":false,"time_zone":"Nuku'alofa","title":"Developer","updated_at":"2012-02-25T02:11:30+13:00","zip":null,"actions":null,"profile_image_url":"small,/assets/images/users/profile_images/missing_small.png,medium,/assets/images/users/profile_images/missing_medium.png,large,/assets/images/users/profile_images/missing_large.png","enabled":true,"display_name":"TIBBR Admin","terms_accepted":null,"bubble":null,"bubble_state":null,"phone":"8901328792","office":null,"mobile":null,"location":"Pune","custom_properties":{"terms_accepted":null,"bubble":null,"bubble_state":null,"phone":"8901328792","office":null,"mobile":null,"location":"Pune"}}];
                var channels = [{"json_class":"Channel","activated":true,"carrier":null,"ctype":"email","id":3,"name":"tibbradmin_channel","paused":false,"rich_text":false,"target":"tibbr-support@tibco.com","user_id":3,"actions":null}];
                this.view = new SubjectLeftNavView({ model:subject, collection:subSubjectList, popular_list:subSubjectList, resultList:peopleList, channels:channels });

            });
            describe("Instantiation", function () {

                it("should create a li element", function () {
                    expect(this.view.el.nodeName).toEqual("DIV");
                })
            });

            describe("Rendering", function () {
                beforeEach(function () {
                      this.view.render();
                })

                it("should have a link with id notify ", function () {
                     var view = $(this.view.el);
                    expect(view).toContain('a#edit_subject');
                  //   expect(this.html.find("#notify"))
                });
//                it("should have a link with id notify ", function () {
//                    expect(this.html).toContain("a#invite_people");
//                });
            });


        });
    });