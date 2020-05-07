var querystring = require('querystring');
var fs = require("fs");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
    var body = fs.readFileSync('startPage.html');
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
    }

function giena(response, postData)
{
    console.log("Request handler 'giena' was called.");
    getImg(response, postData);
}

function gazel(response, postData)
{
    console.log("Request handler 'gazel' was called.");
    getImg(response, postData);
}

function gekkon(response, postData)
{
    console.log("Request handler 'gekkon' was called.");
    getImg(response, postData);
}

function getImg(response, postData)
{
    console.log("Request handler 'getImg' was called.");

    var data = querystring.parse(postData).text;
    var arr = data.split(' ');

    response.writeHead(200, {'Content-Type': 'image/jpeg'});

    var image;

    if ( arr.length == 2 )
    {
        image = fs.readFileSync('pic/' + arr[0] + arr[1] + '.jpg');
    }
    else 
    {
        var num = Math.floor(Math.random() * 10);
        image = fs.readFileSync('pic/' + data + num + '.jpg');
    }

    response.write(image);
    response.end();
}


exports.start = start;
exports.giena = giena;
exports.gazel = gazel;
exports.gekkon = gekkon;