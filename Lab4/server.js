//Подключение http-модуля,
//который поставляется вместе с Node.js и
//реализация доступа к нему через переменную http
var http = require("http");
//Подключение модуля для работы с файловой системой
var fs = require("fs");

var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname);

        var page = fs.readFileSync('main.html');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(page);
        response.end();
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