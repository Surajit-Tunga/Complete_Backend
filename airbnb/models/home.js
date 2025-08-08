const db = require('../utils/databaseUtils');

module.exports = class Home {
    constructor(houseName, price, location, rating){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
    }

    save() {
            
   }

    static fetchAll() {
       return db.execute('SELECT * FROM homes');    
    } 

    static findById(homeId, callback) {

      }

    static deleteById(homeId, callback) {
        
      }  
    }

    