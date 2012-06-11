define([
    "underscore"
    , "tibbr"
]
    , function (_, Tibbr) {
        return Tibbr.Asset = Tibbr.Model.extend({
            defaults:{modelType:"Asset"},
            initialize:function () {
                _.bindAll(this, 'isImage', 'fileSize', 'icon', 'downloadUrl', 'previewUrl', 'originalUrl');

            },
            icon:function () {
                var contentType = this.get('data_content_type'),
                    fileIcons = {
                        'application/pdf':'pdf-icon.png',
                        'application/msword':'images/word-icon.png',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':'word-icon.png',
                        'text/plain':'txt-icon.png',
                        'application/vnd.ms-excel':'xls-icon.png',
                        'application/zip':'zip-icon.png',
                        'application/vnd.ms-powerpoint':'ppt-icon.png',
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation':'ppt-icon.png',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'xls-icon.png',
                        'application/x-zip-compressed':'zip-icon.png',
                        'application/octet-stream':'zip-icon.png'
                    };
                return fileIcons[contentType] || 'clip-icon.png';
            },
            isImage:function () {
                return  this.get('data_content_type').indexOf("image") !== -1
            },
            fileSize:function () {
                return this.get('data_file_size').toString(2).length + "KB"
            },
            downloadUrl:function () {
                return Tibbr.assert(this.get('original_location'));
            },
            previewUrl:function () {
                return Tibbr.assert(this.get('preview_location'))
            },
            originalUrl:function () {
                return Tibbr.assert(this.get('original_location'))
            }


        });
    });
