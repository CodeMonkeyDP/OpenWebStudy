var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/giena"] = requestHandlers.giena;
handle["/gazel"] = requestHandlers.gazel;
handle["/gekkon"] = requestHandlers.gekkon;
server.start(router.route, handle);