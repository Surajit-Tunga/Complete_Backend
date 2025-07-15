// External Module
const express= require('express');

// Import Routes
const userRouter =require('./routes/userRouter');
const hostRouter = require('./routes/hostRouter');


const app = express();

app.use(express.urlencoded());

// It is a middleware in Express.js used to parse incoming requests with URL-encoded payloads, typically from HTML form submissions.
// The parsed data is available on req.body.
app.use("/user",userRouter);
app.use("/host",hostRouter);

app.use((req, res, next)=>{
    res.status(404).send("<p>404 Page not found</p>")
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
}) 