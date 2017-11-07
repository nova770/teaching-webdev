'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/lorem should return '<!DOCTYPE html><html><body>lorem ipsum</body></html>' as html
var server = express();

server.get('/lorem', function(req, res){
    res.send('<!DOCTYPE html><html><body>lorem ipsum</body></html>');
});

server.listen(process.env.PORT || 8080);