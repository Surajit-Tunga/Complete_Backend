const http = require('http'); 
const fs = require('fs');
const Server = http.createServer((req, res) =>{
    console.log(req.url, req.method, req.headers);

    if (req.url==='/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Complete Backend</title></head>');
        res.write('<body><h1>Welcome Complete Backend</h1>');

        res.write('<form action="/submit-details" method="POST">');
        res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
        res.write('<label for="male">Male</label>');
        res.write('<input type="radio" id="male" name="sex" value="male">');
        res.write('<label for="Female">Female</label>');
        res.write('<input type="radio" id="Female" name="sex" value="Female">');
        res.write('<input type="submit" Value="Submit">')
        res.write('</form>');

        res.write('</body>');
        res.write('</html>');
        return res.end();
    } else if ( req.url.toLowerCase()==="/submit-details" && req.method=="POST") {
        fs.writeFileSync('user.txt', 'Surajit');
        res.statusCode = 302; // HTTP status for redirection
        res.setHeader('Location', '/') // Redirect location
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