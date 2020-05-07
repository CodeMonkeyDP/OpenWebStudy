//Подключение http-модуля,
//который поставляется вместе с Node.js и
//реализация доступа к нему через переменную http
var http = require("http");
//Подключение модуля для работы с файловой системой
var fs = require("fs");

var url = require("url");

var querystring = require("querystring");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        pathname ="/"+ querystring.parse(postData).text.split(' ')[0];
        console.log("Received POST data chunk '"+
        postDataChunk + "'.");
        });
        request.addListener("end", function() {
        route(handle, pathname, response, postData);
        });
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;

// //Создание http-сервера, использующего порт 8888
// http.createServer( function(request, response) {
// console.log("Request received");
// //загрузка html страницы из файловой системы
// var page = fs.readFileSync('main.html');
// //запись в ответ заголовка с указанием кода состояния, и типа возвращаемого контента
// response.writeHead(200, { 'Content-Type': 'text/html' });
// //тело ответа
// response.write(page);
// //отправка ответа
// response.end();
// }).listen(8888);
// console.log("Server has started");
// var http = require("http");
// var server = http.createServer();
// server.listen(8888);