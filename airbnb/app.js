// External Module
const express= require('express');

// Import Routes
const userRouter =require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');


const app = express();

app.use((req, res, next)=>{
    console.log(req.url, req.method);
   next();
})

app.use(express.urlencoded());

// It is a middleware in Express.js used to parse incoming requests with URL-encoded payloads, typically from HTML form submissions.
// The parsed data is available on req.body.

app.use(userRouter);

app.use(hostRouter);

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
}) 