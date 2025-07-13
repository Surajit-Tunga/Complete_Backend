
const express = require('express');

const reqHandler = require('./user');

const app = express()

app.use("/",(req, res, next)=>{
    console.log("Came in First middleware", req.url, req.method);
    next()
})


app.use("/submit-details",(req, res, next)=>{
    console.log("Came in second middleware", req.url, req.method);
     res.send('<p>Welcome to middleware</p>');
})



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on Localhost:${PORT}`);
});
