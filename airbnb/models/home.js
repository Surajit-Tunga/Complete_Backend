const {getDB} = require('../utils/databaseUtils');

module.exports = class Home {
    constructor(houseName, price, location, rating, description, id){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
        this.description =description;
        this.id =id;
    }

    save() {
      const db = getDB();
      return db.collection('homes').insertOne(this);
    }

    static fetchAll() {
       
    } 

    static findById(homeId) {

      }

    static deleteById(homeId) {
      
      }  
    }

    