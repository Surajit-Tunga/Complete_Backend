const express = require('express');

const path = require('path')

const homeRoute = require('./routes/homeRouter');
const contactRoute = require('./routes/contactRouter');
const rootDir = require('./utils/path')

const app = express();

app.use(express.urlencoded());

app.use(homeRoute);
app.use(contactRoute);

app.use((req, res, next)=>{
    res.sendFile(path.join(rootDir, 'views', '404.html'))
})



const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`The Server is running on http://localhost:${PORT}`);
});