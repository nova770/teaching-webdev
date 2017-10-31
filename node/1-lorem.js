'use strict';

var http = require('http'); // do not change this line

// any request should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html
var server = http.createServer(function(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
    res.end();
});

server.listen(8080);