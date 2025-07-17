const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// middleware 1 
app.use((req, res, next)=> {
    console.log("First Middleware",req.url, req.method);
    next();
})

// middleware 2
app.use((req, res, next)=> {
    console.log("Second Middleware",req.url, req.method);
    next();
})

// middleware 3
// app.use((req, res, next)=> {
//     console.log("Third Middleware",req.url, req.method);
//     res.send("<p>Welcome to 3rd Middleware</p>")
// })

app.get("/",(req, res, next)=> {
    console.log("/ Middleware",req.url, req.method);
   res.send("<p>Welcome to / Middleware</p>")
})

app.get("/contact",(req, res, next)=> {
    console.log("contact Middleware",req.url, req.method);
   res.send(`
    <p>contact us</p>
    <form action="/contact" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your email" />
      <input type="submit"/>
    </form>
    `)
})

app.use(bodyParser.urlencoded());

app.post("/contact",(req, res, next)=> {
    console.log("contact post Middleware",req.url, req.method, req.body);
     res.send("<p>Thank you for contact us.</p>")
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`The Server is running on http://localhost:${PORT}`);
});