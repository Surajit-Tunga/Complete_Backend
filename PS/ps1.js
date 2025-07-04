const http = require('http'); 

const Server = http.createServer((req, res)=>{

    if (req.url==='/'){
        res.setHeader('Content-Type', 'text/html');

        res.write('<html>')

        res.write('<head>')
        res.write('<title>PS</title>')
        res.write('</head>')

        res.write('<body>')

        res.write('<nav>')
        res.write('<ul>')

        res.write('<li><a href="/home">home</a></li>')
        res.write('<li><a href="/men">men</a></li>')
        res.write('<li><a href="/women">women</a></li>')
        res.write('<li><a href="/kids">kids</a></li>')
        res.write('<li><a href="/cart">cart</a></li>')

        res.write('<ul>')
        res.write('</nav>')

        res.write('<body>')
        res.write('</html>')

        return res.end();

    } else if (req.url==='/home') {
        res.setHeader('Content-Type', 'text/html');
        
        res.write('<html>')

        res.write('<head>')
        res.write('<title>PS</title>')
        res.write('</head>')

        res.write('<body>')

        res.write('<p>welcome to Home </p>')

        res.write('<body>')
        res.write('</html>')

        return res.end();
    } else if (req.url==='/men') {
        res.setHeader('Content-Type', 'text/html');
        
        res.write('<html>')

        res.write('<head>')
        res.write('<title>PS</title>')
        res.write('</head>')

        res.write('<body>')

        res.write('<p>welcome to men </p>')

        res.write('<body>')
        res.write('</html>')

        return res.end();
    }else if (req.url==='/women') {
        res.setHeader('Content-Type', 'text/html');
        
        res.write('<html>')

        res.write('<head>')
        res.write('<title>PS</title>')
        res.write('</head>')

        res.write('<body>')

        res.write('<p>welcome to women </p>')

        res.write('<body>')
        res.write('</html>')

        return res.end();
    }else if (req.url==='/kids') {
        res.setHeader('Content-Type', 'text/html');
        
        res.write('<html>')

        res.write('<head>')
        res.write('<title>PS</title>')
        res.write('</head>')

        res.write('<body>')

        res.write('<p>welcome to kids </p>')

        res.write('<body>')
        res.write('</html>')

        return res.end();
    } else if (req.url==='/cart') {
        res.setHeader('Content-Type', 'text/html');
        
        res.write('<html>')

        res.write('<head>')
        res.write('<title>PS</title>')
        res.write('</head>')

        res.write('<body>')

        res.write('<p>welcome to cart </p>')

        res.write('<body>')
        res.write('</html>')

        return res.end();
    }
});

const PORT = 3000;
Server.listen(PORT, ()=> {
    console.log(`website is running on: Localhost:${PORT}`)
})