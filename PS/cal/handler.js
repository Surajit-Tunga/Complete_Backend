const {sumReq} =require('./sumreq');

const requestHandler = (req, res) =>{
  console.log(req.url, req.method)
  if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        
        res.write(`
            <html>
                 <head>
                     <title>Calculator</title>
                 </head>
                 <body>
                     <h1>Welcome to Calculator </h1>
                     <a href="/calculator">Go to Calculator </a>
                 <body>
            </html>`)

        return res.end();
  }  else if (req.url ==="/calculator") {
    res.setHeader('Content-Type', 'text/html');
        
        res.write(`
            <html>
                 <head>
                     <title>Calculator</title>
                 </head>
                 <body>
                     <form action="/result" method="post">

                        <label for="num1">Number 1:</label>
                        <input type="number" id="num1" name="num1" required><br><br>

                        <label for="num2">Number 2:</label>
                        <input type="number" id="num2" name="num2" required><br><br>

                        <button type="submit">Submit</button>
                    </form>
                 <body>
            </html>`)

        return res.end();

  }  else if (req.url ==="/result" && req.method ==="POST") {
    return sumReq(req, res);
  }

   res.setHeader('Content-Type', 'text/html');
        
        res.write(`
            <html>
                 <head>
                     <title>Calculator</title>
                 </head>
                 <body>
                     <h1>404 error page not found </h1>
                     <a href="/"> go to home </a>
                 <body>
            </html>`)

        return res.end();
}

exports.requestHandler = requestHandler;


