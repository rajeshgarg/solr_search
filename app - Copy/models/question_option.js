define([
    "underscore"
    , "tibbr"
    , 'collections/users'
]
    , function (_, Tibbr, Users) {
        return Tibbr.QuestionOption = Tibbr.Model.extend({
            defaults:{
                modelType:"QuestionOption"
            },
            initialize:function () {
                _.bindAll(this);
            },
            hasSelected:function () {
                return  _.include(this.get('actions'), "unselect")
            },
            voterList:function () {
                return new Users(this.get('users')).map(function (user) {
                    return {full_name:user.get('display_name'), image:user.get('profileImage')}
                })
            }
        })

    });
