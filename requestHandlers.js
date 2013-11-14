//exec() : it executes a shell command from within Node.js.
var exec = require("child_process").exec;

var querystring = require("querystring"),
    fs=require('fs'),
    formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");

//    function sleep(milliSeconds) {
//        var startTime = new Date().getTime();
//        while (new Date().getTime() < startTime + milliSeconds);
//    }

//    sleep(10000);

//    var content = "empty";
//    exec("find /", { timeout: 10000, maxBuffer: 20000*1024 },function (error, stdout, stderr) {
//        response.writeHead(200, {"Content-Type": "text/plain"});
//        response.write(stdout);
//        response.end();
//    });

//    return "We have called to Start";
//    return content;
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/uploadImage" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function index(response){
    console.log("Request handler 'index' was called.");
    var body =
        '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

}

function upload(response,postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    var content='We have called to Upload\n'+
        'You have sent : \n'+
        querystring.parse(postData).text;
    response.write(content);
    response.end();
//    return "We have called to Upload";

}

function uploadImage(response,request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
//    console.log(request);
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
//        console.log(request);
//        console.log(fields);
        console.log(files.upload.name);
        /* Possible error o n Windows systems:
         tried to rename to an already existing file */
        fs.rename(files.upload.path, "tmp/"+files.upload.name, function(error) {
            if (error) {
                fs.unlink("tmp/"+files.upload.name);
                fs.rename(files.upload.path, "tmp/"+files.upload.name);
            }
        });
        console.log('ENCODE:   '+encodeURIComponent(files.upload.name));
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>File name : "+files.upload.name+"<br/>");
        response.write("<img src='/show?q="+encodeURIComponent(files.upload.name)+"' />");
        response.end();
    });

}

function show(response, request,query){
    console.log("Request handler 'show' was called.");

    fs.readFile("tmp/"+query.q, "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });

}

exports.start = start;
exports.upload = upload;
exports.index = index;
exports.show = show;
exports.uploadImage = uploadImage;
