 # Request & Response

## 1. Node lifecycle & NodeLoop

![](./Note-Img/Nodecycle.png)

---
## 2. How to exit event loop

```js
const http = require('http'); 
const Server = http.createServer((req, res) =>{
    console.log(req);
    process.exit(); // Stops the Event Loop
});

const PORT = 3000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});
```
---

## 3. Request object

```js
const http = require('http'); 
const Server = http.createServer((req, res) =>{
    console.log(req.url, req.method, req.headers); // request objects
});

const PORT = 3000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});
```
---

## 4. Sending Response

```js
const http = require('http'); 
const Server = http.createServer((req, res) =>{
    console.log(req.url, req.method, req.headers);
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
```
---

## 5. Routing Request

<details>
   <summary>See Code (click to expand)</summary>

```js
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
```
</details>

---

## 6. Taking user input

<details>
   <summary>See Code (click to expand)</summary>

```js
const http = require('http'); 
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
```

</details>

---

## 7. Redirecting Requests
<details>
   <summary>See Code (click to expand)</summary>

```js
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
```
</details>

---

## Practice Set

Create a page that shows a nav bar with:
- Home
- Men
- Women
- Kids
- Cart

Clicking each link navigates to that section and "welcome to the section" text is shown.

<details>
  <summary>See Code (click to expand)</summary>

```js
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
```
</details>
