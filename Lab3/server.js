//Подключение http-модуля,
//который поставляется вместе с Node.js и
//реализация доступа к нему через переменную http
var http = require("http");
//Подключение модуля для работы с файловой системой
var fs = require("fs");

var url = require("url");

function start() {
    function onRequest(request, response) {
        console.log("Request received");
        // var page = fs.readFileSync('main.html');
        // response.writeHead(200, { 'Content-Type': 'text/html' });
        // response.write(page);
        
        var params = url.parse(request.url).search;

        if (params)
        {
            // Выкидываем знак вопроса
            params = params.split('?')[1];
            // Выкидываем bash
            params = params.split('#')[0];

            // Дробим на параметры
            var arr = params.split('&');

            var counter = arr.length;
            
            var page = fs.readFileSync('main.html');
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(page);

            response.write(String(counter), encoding = 'utf-8');
            

            console.log(counter);
            
        }

        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
    
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