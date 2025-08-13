const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://Surajit:root@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoConnect = (Callback)=>{
   MongoClient.connect(url).then(client => {
      Callback(client);
   }).catch(error=>{
        console.log(error);
   });
}

module.exports = mongoConnect;