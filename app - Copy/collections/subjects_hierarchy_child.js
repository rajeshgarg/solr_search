define([
    "jquery"
    , "tibbr"
    , "collections/subjects"
]
    , function ($, Tibbr, Subjects) {
        return Tibbr.SubjectsHierarchyChild = Subjects.extend({
            className: "subjects_hierarchy_child",
            tibbrURL:{controller:"subjects", action:"children"}

        });
    });