'use strict';

var express = require('express'); // do not change this line

// http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text

// http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code

// http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day

// http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

// http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

var exp = express();

exp.get('/missing', function (req, res) {
    res.status(404);
    res.set({'Content-Type': 'text/plain'});
    res.send('your princess is in another castle');
});

exp.get('/redirect', function (req, res) {
    res.status(302);
    res.set({'Location': '/redirected'});
    res.send();
});

exp.get('/redirected', function (req, res) {
    res.status(200);
    res.set({'Location': '/redirected'});
    res.send();
});

exp.get('/cache', function (req, res) {
    res.status(200);
    res.set({'Cache-Control': 'max-age=86400', 'Content-Type': 'text/plain'});
    res.send('cache this resource');
});

exp.get('/cookie', function (req, res) {
    res.status(200);
    res.set({'Content-Type': 'text/plain', 'Set-Cookie': 'hello=world'});
    res.send('i gave you a cookie');
});

exp.get('/check', function (req, res) {
    res.status(200);
    res.set({'Content-Type': 'text/plain'});

    if(req.headers.cookie){res.send('yes');}
    else{res.send('no');}
});

exp.listen(process.env.PORT || 8080);