const http = require('http'); 
const Server = http.createServer((req, res) =>{
    console.log(req.url, req.method, req.headers);

    if (req.url==='/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Complete Backend</title></head>');
        res.write('<body><h1>Welcome Complete Backend</h1></body>');
        res.write('</html>');
        return res.end();
    } else if (req.url==='/about') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Complete Backend</title></head>');
        res.write('<body><h1>Complete Backend About</h1></body>');
        res.write('</html>');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Backend</title></head>');
    res.write('<body><h1>Complete Backend</h1></body>');
    res.write('</html>');
    res.end();
    
});

const PORT = 3000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});