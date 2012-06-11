// Routes
// Define all your application routes here

define(function () {

    return {
        "":"index",
        "/users/*path":"users",
        "/subjects/*path":"subjects",
        "/messages/*path": "messages",
        "/test/*path": "test",
        "/explore/*path": "explore",
        "/events/*path": "events"
    }
});