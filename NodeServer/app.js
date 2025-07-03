const http = require('http'); // import the core module http in a varible http

const Server = http.createServer((req, res) =>{
    console.log(req);
});

const PORT = 3000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});