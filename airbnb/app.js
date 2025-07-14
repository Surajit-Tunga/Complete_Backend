// External Module
const express= require('express');

const app = express();

app.get("/",(req, res, next)=>{
    console.log("Welcome",req.url, req.method);
    res.send(`
        <p>Welcome to airbnb</p>
        <a href="/add-home">Add Home</a>
        `)
})

app.get("/add-home",(req, res, next)=>{
    console.log("add home",req.url, req.method);
    res.send(`
        <P>Plese add your home.</p>
        <form action="/add-home" method="POST">
          <input type="text" name="houseName" placeholder="Enter your House Name" />
          <input type="submit"/>
       </form>
        `)
})

app.post("/add-home",(req, res, next)=>{
    console.log("add home",req.url, req.method);
    res.send(`
        <P>Home added succesfully.</p>
        <a href="/add-home">Add Home</a>
        `)
})

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
}) 742