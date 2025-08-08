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
      if (this.id) { // for update
          return db.execute(
          'UPDATE homes SET houseName=?, location=?, price=?, rating=?, description=? WHERE id=?',
          [this.houseName, this.location, this.price, this.rating, this.description, this.id]
       );

      } else { // add new
          return db.execute(
          'INSERT INTO homes (houseName, location, price, rating, description) VALUES (?, ?, ?, ?, ?)',
          [this.houseName, this.location, this.price, this.rating, this.description]
       );
     }
   }

    static fetchAll() {
       return db.execute('SELECT * FROM homes');    
    } 

    static findById(homeId) {
      return db.execute('SELECT * FROM homes WHERE id=?', [homeId]); 

      }

    static deleteById(homeId) {
      return db.execute('DELETE FROM homes WHERE id=?', [homeId]); 
      }  
    }

    