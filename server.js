var http = require("http");
var url = require("url"),
    querystring = require("querystring");

function start(route, handle) {
    function onRequest(request, response) {
        console.log("Request received.");
        var url_parts = url.parse(request.url, true);

        console.log(url_parts.query);
        console.log('-------------Parsing-----------------');

        var pathname = url_parts.pathname;
        var query = url_parts.query;
        console.log("Request for " + pathname + " received.");

        if (pathname == '/upload') {
            var postData = "";
            request.setEncoding("utf8");

            request.addListener("data", function (postDataChunk) {
                postData += postDataChunk;
                console.log("Received POST data chunk '" + postDataChunk + "'.");
            });

            request.addListener("end", function () {
                route(pathname, handle, response, postData, query);
            });
        } else {
            route(pathname, handle, response, request, query);
        }

//        response.writeHead(200, {"Content-Type": "text/plain"});
//        response.write("Hello World \n");
//        response.write(content);
//        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;