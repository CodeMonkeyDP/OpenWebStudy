function start() {
    console.log("Request handler 'start' was called.");
    }

   function upload() {
    console.log("Request handler 'upload' was called.");
    }

function root() {
    console.log("Request handler 'root' was called.");
}

function time() {
    console.log("Request handler 'time' was called.");
}

function news() {
    console.log("Request handler 'news' was called.");
}

    exports.start = start;
    exports.upload = upload;
    exports.root = root;
    exports.time = time;
    exports.news = news;