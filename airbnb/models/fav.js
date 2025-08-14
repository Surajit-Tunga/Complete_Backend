const {getDB} = require('../utils/databaseUtils');

module.exports = class fav {
    constructor(houseId){
        this.houseId = houseId;
    }
    save(){
      const db = getDB();
      return db.collection('fav').findOne({houseId: this.houseId}).then(exsistingFav =>{
        if(!exsistingFav) {
          return db.collection('fav').insertOne(this);
        }
         return new Promise.resolve();      })
      
    }
     static getFavourites(){
      const db = getDB();
      return db.collection('fav').find().toArray();
    }
     static deleteById(delHomeId) {
        const db = getDB();
        return db.collection('fav').deleteOne({houseId: delHomeId});
    }
}