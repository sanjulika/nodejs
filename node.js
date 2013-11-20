var server = require("./server");
var router = require("./route");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.index;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/index"] = requestHandlers.index;
handle["/show"] = requestHandlers.show;
handle["/uploadImage"] = requestHandlers.uploadImage;


server.start(router.route,handle);