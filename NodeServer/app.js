const http = require('http'); // import the core module http in a varible http

http.createServer((req, res) =>{
    console.log(req);
});