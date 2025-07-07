
const fs = require('fs');

const reqHandler = ((req, res) =>{
    console.log(req.url, req.method,);

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

        const body= [];

      req.on('data', chunk => {
    // Whenever a small piece (chunk) of data arrives from the client,
    // this function runs and 'chunk' contains that piece of data.
    // We print (log) the chunk to see what data is coming in.
    console.log(chunk);
    // 'body' is an array containing multiple Buffer objects (chunks of data).
    body.push(chunk);
});

     req.on('end', ()=>{
       const fullBody = Buffer.concat(body).toString();
       //Buffer.concat(body) joins all these Buffer chunks into a single Buffer. & .toString() converts the combined Buffer into a readable string.
       console.log(fullBody);

       const  para = new URLSearchParams(fullBody);

       const Body= {};
       for (const [key, val] of para.entries()) {
          Body[key]=val;
       }
       console.log(Body);
        fs.writeFileSync('user.txt', JSON.stringify(Body));
     })

       
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

module.export =reqHandler;