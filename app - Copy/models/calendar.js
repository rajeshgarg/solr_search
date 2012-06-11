define([
    "underscore"
    , "tibbr"
    , 'require/moment'
]
    , function (_, Tibbr,moment) {
        return Tibbr.Calendar = Tibbr.Model.extend({
            baseName:"calendars",

            defaults:{modelType:"Calendar"},

            initialize:function () {
                _.bindAll(this, 'getFormattedDay', 'getFormattedNumberDate', 'getFormattedDateTime', 'getFormattedTime', 'getStatusRsvp', 'setStatus', 'parseUsers', 'exportPath','start_date_month','start_day','start_date','duration');
                // this.parseUsers()


            },

            getFormattedDay:function () {
                var changed = new Date(this.get('start_date_time'));
                var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" ];
                var final = monthNames[changed.getMonth()];
                return final;
            },
            getFormattedNumberDate:function () {
                var changed = new Date(this.get('start_date_time'));

                var date = changed.getDate();


                return date;
            },
            getFormattedDateTime:function () {
                var dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var changed = new Date(this.get('start_date_time'));
                var hours = changed.getHours() - 4;
                var a = "am";
                if (hours >= 12) {
                    a = hours < 12 ? 'am' : 'pm';
                    hours = hours - 12;
                }
                if (hours == 0) {
                    a = hours < 12 ? 'am' : 'pm';
                    hours = 12;
                }

           //     console.log("hours is" + hours)
                var final = dayNames[changed.getDay()]

                return final + ", " + this.getFormattedDay() + " " + changed.getDate() + " at " + hours + ":" + changed.getMinutes() + " " + a;
            },
            getFormattedTime:function () {
                var arr = new Array(2);
                arr = this.get('duration').split(':');
                if (arr.length <= 1) {
                    return "00 hours and 00 minutes";
                }
                else {
                    var final = arr[0] + " hours and " + arr[1] + " minutes";
                    return final;
                }
            },

            getStatusRsvp:function () {

                if (this.get('calendar_users').length > 0)
                    var users = this.get('calendar_users');
                var calId = this.get('id');
                var _status = {may_be_attending:"May be attending", attending:"Attending", not_attending:"Not Attending"}
                var user = _.map(users, function (user) {
                    //  console.log('the user is'+user.user_id);
                    if (user.user_id === Tibbr.currentUser.id) return user;

                })[0];
                var lists = _.map(['attending', 'may_be_attending', 'not_attending'], function (v, i) {
                    user = user || {};
                    var checked = "";
                    if (user.status === v) checked = "checked='checked'";

                    return '<li> <label><input type="radio" value="' + v + '" class="ratio-event" ' + checked + ' name="calendar_user" data-calId="' + calId + '">' + _status[v] + ' </label></li>';
                });
                return lists.join(" ");


            },
            setStatus:function () {

                var _status = {may_be_attending:"May be attending", attending:"Attending", not_attending:"Not Attending"}

                var users = this.get('calendar_users')
                var user = _.map(users, function (user) {
                    if (user.user_id === Tibbr.currentUser.id) return user;
                })[0];

                if (user === undefined)
                    return "Your have not responded yet";
                else
                    return  "Your response is " + _status[user.status]

            },


            parseUsers:function () {
                var calUsers = this.get('calendar_users') || [];
                var attendingUsers = _.filter(calUsers, function (usr) {
                    return (usr.status === "attending");
                });

                var mayBeAttendingUsers = _.filter(calUsers, function (usr) {
                    return (usr.status === "may_be_attending");
                });

                var notAttendingUsers = _.filter(calUsers, function (usr) {
                    //    console.log(usr)
                    return(usr.status === "not_attending");
                });
                //         console.log([attendingUsers, mayBeAttendingUsers , notAttendingUsers])
                return [attendingUsers, mayBeAttendingUsers , notAttendingUsers];
            },


            callRsvp:function (status) {
                this.action("create_rsvp", "update", {data:{params:{id:this.get('id'), status:status}}});
            },

            exportPath:function () {
                return this._path('calendars/' + this.id + '/export')
            },
            start_date_month:function(){
                return moment(this.get("start_date_time")).format('MMM');
            },
            start_day:function(){
                return moment(this.get("start_date_time")).format('DD');
            },
            start_date:function(){
                return moment(this.get("start_date_time")).format('dddd, MMM DD h:mm A');
            },
            duration:function(){

            }


        });
    });
