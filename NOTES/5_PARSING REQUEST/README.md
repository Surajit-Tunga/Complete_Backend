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
