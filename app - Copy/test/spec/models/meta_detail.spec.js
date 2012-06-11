define([
    'underscore'
    , 'tibbr'
    , 'models/meta_detail'
]
    , function (_, Tibbr, MetaDetail) {


        describe("MetaDetail", function () {
            beforeEach(function () {

                //define meta details here
                this.data = [
                    {"key":"app_user", "label":"Oracle App. User Name", "position":1, "type":"string", "ui_type":"text_field", "required":true, "multi_value":false, "editable":false, "default":"Tibbr"},
                    {"key":"app_password", "label":"Oracle App. Password", "position":2, "type":"string", "ui_type":"password", "required":true, "multi_value":false},
                    {"key":"fromdate", "label":"Order From Date (dd-mmm-yy). Example 01-Jan-11", "position":3, "type":"string", "ui_type":"date_time", "required":true, "multi_value":false},
                    {"key":"todate", "label":"Order To Date (dd-mmm-yy). Example 01-Jan-11", "position":4, "type":"string", "ui_type":"date", "required":false, "multi_value":false, "description":"Leave 'Order To Date' empty to include all future orders"},
                    {"key":"record_status", "label":"Status Type", "position":5, "type":"string", "ui_type":"select", "required":true, "multi_value":true, "has_dependents":false, "allowed_values":[
                        {"id":"Backordered", "value":"Backordered"},
                        {"id":"Cancelled", "value":"Cancelled"},
                        {"id":"Closed", "value":"Closed"},
                        {"id":"Shipped", "value":"Shipped"},
                        {"id":"Staged/Pick Confirmed", "value":"Staged/Pick Confirmed"},
                        {"id":"Booked", "value":"Booked"},
                        {"id":"Entered", "value":"Entered"}
                    ]},
                    {"key":"last_run_time", "label":"Last Run Time", "position":6, "type":"string", "ui_type":"hidden", "required":false, "multi_value":false},
                    {"key":"share_option", "label":"Post Messages To", "position":7, "type":"string", "ui_type":"radio_group", "required":true, "multi_value":false, "has_dependents":true, "allowed_values":[
                        {"id":"private", "value":"Myself only"},
                        {"id":"share", "value":"Myself and others"},
                        {"id":"public", "value":"Subjects"}
                    ], "default":"private"},
                    {"key":"users", "label":"Users", "position":8, "type":"string", "ui_type":"users", "required":false, "multi_value":false, "dependency":[
                        {"id":"share_option", "value":"share_option"}
                    ], "filter_value":"share"},
                    {"key":"subjects", "label":"Subjects", "position":9, "type":"string", "ui_type":"subjects", "required":false, "multi_value":false, "dependency":[
                        {"id":"share_option", "value":"share_option"}
                    ], "filter_value":"public"}
                ];

                this.metaDetail = new MetaDetail();

            });

            describe("parse", function () {


                beforeEach(function () {
                    this.metaDetail.parse(this.data);
                    this.schema = this.metaDetail.schema;
                });

                it("should correct parse schema", function () {
                    expect(this.schema.app_user.type).toEqual("TextField");
                    expect(this.schema.app_user.disabled).toBeTruthy();
                    expect(this.schema.app_user.required).toBeTruthy();
                    expect(this.schema.app_user.multiValue).toBeFalsy();
                    expect(this.metaDetail.get('app_user')).toEqual("Tibbr");

                    expect(this.schema.app_password.type).toEqual("Password");
                    expect(this.schema.app_password.disabled).toBeFalsy();
                    expect(this.schema.app_password.required).toBeTruthy();

                    expect(this.schema.fromdate.type).toEqual("DateTime");
                    expect(this.schema.fromdate.disabled).toBeFalsy();
                    expect(this.schema.fromdate.required).toBeTruthy();

                    expect(this.schema.todate.type).toEqual("Date");
                    expect(this.schema.todate.disabled).toBeFalsy();
                    expect(this.schema.todate.required).toBeFalsy();

                    expect(this.schema.record_status.type).toEqual("Select");
                    expect(this.schema.record_status.disabled).toBeFalsy();
                    expect(this.schema.record_status.multiValue).toBeTruthy();
                    expect(this.schema.record_status.required).toBeTruthy();
                    expect(this.schema.record_status.options.length).toEqual(7);


                    expect(this.schema.last_run_time.type).toEqual("Hidden");
                    expect(this.schema.last_run_time.disabled).toBeFalsy();
                    expect(this.schema.last_run_time.required).toBeFalsy();


                    expect(this.schema.users.type).toEqual("Users");
                    expect(this.schema.users.disabled).toBeFalsy();
                    expect(this.schema.users.required).toBeFalsy();
                    expect(this.schema.users.filterValue).toEqual("share");


                    expect(this.schema.subjects.type).toEqual("Subjects");
                    expect(this.schema.subjects.disabled).toBeFalsy();
                    expect(this.schema.subjects.required).toBeFalsy();
                    expect(this.schema.subjects.filterValue).toEqual("public");


                });

                it("should correct handel dependency", function () {
                    expect(this.schema.share_option.hasDependents).toBeTruthy();
                    expect(this.schema.share_option.cssClass).toEqual("has_dependents");
                    expect(this.schema.users.dependency).not.toBeEmpty();
                    expect(this.schema.users.cssClass).toEqual("dependency share_option share");
                    expect(this.schema.subjects.dependency).not.toBeEmpty();
                    expect(this.schema.subjects.cssClass).toEqual("dependency share_option public");
                })
            })
        })


    });
