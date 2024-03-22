const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';

    if (filePath == './.html') {
        filePath = './index.html';
    }
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', (error, content) => { 
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });

}).listen(8080);
console.log('Server running at [http://127.0.0.1:8080/](http://127.0.0.1:8080/)');
