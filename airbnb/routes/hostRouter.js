const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/host/add-home",(req, res, next)=>{
    res.send(`
        <P>Plese add your home.</p>
        <form action="/host/add-home" method="POST">
          <input type="text" name="houseName" placeholder="Enter your House Name" />
          <input type="submit"/>
       </form>
        `)
})

hostRouter.post("/host/add-home",(req, res, next)=>{
    console.log(req.body);
    res.send(`
        <P>Home added succesfully.</p>
        <a href="/">Home</a>
        `)
})

module.exports =hostRouter;