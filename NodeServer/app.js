const http = require('http'); 
const reqHandler =require('./user')

const Server = http.createServer(reqHandler);

const PORT = 4000;
Server.listen(PORT, ()=>{
    console.log(`Server Running on Localhost:${PORT}`)
});