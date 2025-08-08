const db = require('../utils/databaseUtils');

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
        return db.execute(`INSERT INTO homes (houseName, location, price, rating, description) VALUES('${this.houseName}','${this.location}',${this.price},${this.rating},'${this.description}')`);          
   }

    static fetchAll() {
       return db.execute('SELECT * FROM homes');    
    } 

    static findById(homeId, callback) {

      }

    static deleteById(homeId, callback) {
        
      }  
    }

    