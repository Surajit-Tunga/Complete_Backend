# Backend_Zero-to-Hero

**Playlist:** [YouTube](https://youtube.com/playlist?list=PL78RhpUUKSwdbr5GMk0GG5LpcWB-MIj2e&si=ssTx-0zRuo2yIt5z)

**Pre-requisites:** Understanding of JavaScript

---
# INTRODUCTION

## 1. What is NodeJS?

- **NodeJS** is an open-source, cross-platform runtime environment for executing JavaScript code outside of a browser.
- It allows JavaScript to run on the server side.
- NodeJS runs on the **V8 engine** (the engine built into Chrome), which compiles JavaScript directly to native machine code.
    - V8 is written in C++ for speed.
- **NodeJS = V8 + Backend Features**
- Features an **event-driven**, **non-blocking I/O** model for efficiency.
- Allows using JavaScript on both the client and the server sides.
- Ideal for scalable network applications due to its architecture.

---

## 2. Features of NodeJS

- Designed to perform **non-blocking operations** by default, making it suitable for I/O-heavy tasks.
- Supports **TCP/UDP sockets**.
- Provides APIs to **read and write files directly**, which is not possible in browser environments for security reasons.
- Enables JavaScript to run on the server, handling HTTP requests, file operations, and other server-side functionalities.
- Code can be organized into reusable modules using `require()`.


> **Note**  
> In NodeJS, there is **no window object**, **no DOM manipulation**, **no BOM (Browser Object Model)**, and **no web-specific APIs** (like LocalStorage, sessionStorage, etc.).
---
## 3. JavaScript on Client Side
- Helps to interact with web Page.
- **Update Content:** Allows changes to the web page.
- Gets HTML, images,.. from the Server.
---
## 4. JavaScript on Server Side
- **Database Management:** stores, retrieves & manages data through operation like **CURD**(Create, Read, Update, Delete).
- **Authentication:** Verifies user identities to control access to the system.
- **Authorization:** Determines what authenticated user are allowed to do by managing permission and access controls.
- **Input Validation:** Check incoming data for correctness, completeness and security to prevent data entry errors.
- **Session Management:** Track user activity across various request to maintain state and manage user-specific settings.
- API Management 
- Error Handling
- Security Measures
- Data Encryption
- Logging and Monitoring
--- 
## 5. Server architechture
![](./Note-Img/Server.png)

### Nodejs Server will
- Create server and listen to incoming requests.
- Validation, connect to database, Processing of data.
- Return Response.

---
## Client side vs Server Side
- The client sends a request, and the server responds.

![](./Note-Img/user.png)

# INSTALLATION

## 1. Install Node.js

First, install [Node.js](https://nodejs.org/) on your system. Node.js comes with npm (Node Package Manager), which is required for installing React and its dependencies.

**Verify installation**

```bash
node --version
npm --version
npx --version
```

If all of the above commands return a version number, your installation is correct.

---

## 2. Executing JS File Using NOde
- create a js file:
```js
console.log("hello");
```
To run the code open terminal :

```bash
node name.js
```
- You will get output: Hello

---

## 3. REPL
- R(Read) E(Eval) P(Print) L(Loop).
- Execute JS Code interactively.
- Ideal for testing, debugging..

### Executing Code via REPL
- Open terminal
```bash
node
```
- After this you can execute js code 
- To exit press ctrl+c twice.

---

#  Node Server

## 1.How DNS Works?
![](./Note-Img/DNS.png)
- **DNS:**Domain Name Service
- User Types a Domain (www.google.com) into the browser.
- The browser sends a DNS query to resolve the domain into in IP address.
- **DNS Server:** Provides the correct ip address for the domain.
- Then the browser uses the IP to connect the web Server & loads the website.

**NOTE**
- **Root DNS:** Starting point of DNS resolution. It directs queries to the correct TDL server(.com, .in......).
- **TDL (Top Level Domain) DNS:** handel Queries for specific top level domain.
- **Authoritive DNS:** Connect the actual IP address of the domain and answer DNS queries.(like google.com)

![](./Note-Img/DNSWORK.png)

---

## 2. How Web Works?

![](./Note-Img/Web.png)

- Client Request Initiation--> DNS Resolution --> TCP Connection --> HTTP Request --> Server Processing --> HTTP Response --> Network transmission --> Client Recive Response --> Rendering.

--- 

## 3. What are the Protocols?

### Http (HyperText Tranfer Protocol):
- Facilated communication between a web browser and Server.
- Sends Data in plain text (no encryption).

### HTTPS (HyperText Tranfer Protocol Secure):
- Encrypts data for secure communiaction.
- Uses SSL/ TLS to encryption.

### TCP (Transmission Control Protocol):
- Ensure reliable, ordered data.
- Established a connection before data sending.

---

## 4. Node Core Modules

- **Built-in:** Core modules are included with node.js installation.
- Highly optimized for performance.
- eg. .fs, .http, .https, .path, .paths.os.........

---

## 5. Require Keyword
```js
const moduleNme = require('module');
```
- Import modules in Node js
- Modules are cached after the first call.

---

## 6. Creating first Node Server

```js
const http = require('http'); // import the core module http in a varible http

function requestListener(req, res) {
    console.log(req);
}

http.createServer(requestListener);
```
- Or 
```js
const http = require('http'); 

const Server = http.createServer((req, res) =>{
    console.log(req);
});

const PORT = 3000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});
```
- Now run the code ( in terminal: node Name.js )
- then open localhost:3000 in your browser and check the terminal.
 ---

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

# Parsing Request
## 1. Streams

![Streams](./Note-Img/Streams.png)

- **Stream**: A stream is a continuous flow of data, allowing data to be processed piece-by-piece rather than all at once.
- **Duplex Stream**: A duplex stream is capable of both reading and writing data (e.g., a TCP socket).

## 2. Chunks

- **Chunk**: A chunk is a small piece or segment of data within a stream.
- Processing data in chunks (rather than entire files or datasets) makes programs more memory-efficient and responsive.
- Streams send data in chunks, which improves performance and allows for handling large files or real-time data efficiently.

## 3. Buffer

- **Buffer**: A buffer is a temporary memory space used to store chunks of data as they are transferred between two locations (such as from a file to a network).
- In Node.js, the Buffer class is used to handle raw binary data directly, especially when working with streams.
- Buffers help manage the flow of data, making sure data is available when needed and preventing data loss or overflow.


> **Summary:**  
> Streams break data into chunks and send them continuously, using buffers to temporarily hold the data, improving efficiency and making it easier to work with large or real-time data.

---

## 4. Reading Chunk

<details>
   <summary>See Code (click to expand)</summary>

   ```js
   const http = require('http'); 
const fs = require('fs');
const Server = http.createServer((req, res) =>{
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

      req.on('data', chunk => {
    // Whenever a small piece (chunk) of data arrives from the client,
    // this function runs and 'chunk' contains that piece of data.
    // We print (log) the chunk to see what data is coming in.
    console.log(chunk);
});

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

## 5. Buffering Chunks

<details>
   <summary>See Code (click to expand)</summary>

```js
const http = require('http'); 
const fs = require('fs');
const Server = http.createServer((req, res) =>{
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
       console.log( Buffer.concat(body).toString());
       //Buffer.concat(body) joins all these Buffer chunks into a single Buffer. & .toString() converts the combined Buffer into a readable string.
     })

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

## 6. Parsing Request

<details>
   <summary>See Code (click to expand)</summary>

```js
const http = require('http'); 
const fs = require('fs');
const Server = http.createServer((req, res) =>{
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

const PORT = 3000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});
```
</details> 

## 7. Using Modules

- Make the server and user separete like this:
- user.js:

<details>
   <summary>See Code (click to expand)</summary>

```js

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

module.exports =reqHandler;
```
</details> 

- app.js:

<details>
   <summary>See Code (click to expand)</summary>

```js

const http = require('http'); 
const reqHandler = require('./user');

const server = http.createServer(reqHandler); 

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server Running on Localhost:${PORT}`);
});

```
</details> 

---

## Practice Set
- Create a Calculator

1. Create a new Node.js project named "Calculator".

2. On the home page (route "/"), show a welcome message and a link to the calculator page.

3. On the "/calculator" page, display a form with two input fields and a "Sum" button.

4. When the user clicks the "Sum" button, they should be taken to the "/calculate-result" page, which shows the sum of the two numbers.

Make sure the request goes to the server.

Create a separate module for the addition function.

Create another module to handle incoming requests.

On the "/calculate-result" page, parse the user input, use the addition module to calculate the sum, and display the result on a new HTML page.

- in PS/Cal

---

# Event Loop

