var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/root"] = requestHandlers.root;
handle["/time"] = requestHandlers.time;
handle["/news"] = requestHandlers.news;
server.start(router.route, handle);