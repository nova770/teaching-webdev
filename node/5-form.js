'use strict';

var http = require('http'); // do not change this line
var querystring = require('querystring'); // do not change this line

// http://localhost:8080/form should return the form as shown below
//   res.writeHead(200, {
//   	'Content-Type': 'text/html'
//   });
//   
//   res.write('<!DOCTYPE html>');
//   res.write('<html>');
//   	res.write('<body>');
//   		res.write('<form action="/new" method="post">');
//   			res.write('<input type="text" name="name">');
//   			res.write('<input type="text" name="message">');
//   			res.write('<input type="submit" value="submit">');
//   		res.write('</form>');
//   	res.write('</body>');
//   res.write('</html>');
//   
//   res.end();

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message' in plain text

// http://localhost:8080/form should return the form as shown above

// http://localhost:8080/new should retrieve the post data, save the name / message (in a global variable) and return 'thank you for your message' in plain text

// http://localhost:8080/list should return the stored messages (from the global variable) 'name: message\nanother name: another message' in plain text

// [the server restarts and looses all messages]

// http://localhost:8080/list should return '' in plain text

var myArray = [];

var server = http.createServer(function (req, res) {
    var postData = "";
    var parsedData = "";

    var nameMessage = "";

    if(req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('you have accessed the ');
        res.end('root');
    }
    else if (req.url === '/form') {

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<!DOCTYPE html><html><body><form action="/new" ' +
                  'method="post"><input type="text" name="name"><input type="text" name="message">' +
                  '<input type="submit" value="submit"></form></body></html>');

        res.end();
    }
    else if(req.method == 'POST' && req.url === '/new')
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        req.on('data', function (data) {
            postData += data;

            if(postData.length > 1e6) req.end();
        });

        req.on('end', function () {

            parsedData = querystring.parse(postData);
            console.log(parsedData);

            nameMessage += parsedData.name + ": " + parsedData.message;
            console.log(nameMessage);
            myArray.push(nameMessage);

            res.end('thank you for your message');
        });
    }

    else if(req.method == 'GET' && req.url === '/list')
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});

        var messages = "";

        for(var i =0; i < myArray.length; i++)
        {
            if(i !== (myArray.length-1)) messages += myArray[i] + '\n';

            else messages += myArray[i];
        }
        res.end(messages);
    }

    else res.end();
});

server.listen(process.env.PORT || 8080);