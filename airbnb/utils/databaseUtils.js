const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = "mongodb+srv://Surajit:root@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let _db;

const mongoConnect = (Callback)=>{
   MongoClient.connect(url).then(client => {
      Callback();
      _db= client.db('airbnb');
   }).catch(error=>{
        console.log(error);
   });
}

const getDB = ()=>{
    if(!_db){
        throw new Error('Mongo not found');
    }
    return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;