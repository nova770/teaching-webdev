'use strict';

var http = require('http'); // do not change this line
var dns = require('dns'); // do not change this line

// http://localhost:8080/pdx.edu should return '131.252.115.150' in plain text (address might be different, there could even be multiple addresses)

// http://localhost:8080/sniklaus.com should return '216.239.36.21\n216.239.38.21\n216.239.32.21\n216.239.34.21' in plain text (addresses / order might be different)

// http://localhost:8080/error should return 'error' in plain text

var server = http.createServer(function (req, res) {

    if(req.url.indexOf('/') === 0)

        res.writeHead(200, {'Content-Type': 'text/plain'});


    dns.resolve4(decodeURI(req.url.substr(1)), function (err, address) {
        if(err) res.end('error');

        else
        {

            var tempVar = "";
            for(var i =0; i < address.length; i++) {
                tempVar += address[i];
            }

            res.end(tempVar);
        }
    });

});

server.listen(process.env.PORT || 8080);