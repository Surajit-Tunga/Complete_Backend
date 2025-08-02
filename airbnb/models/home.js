const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils')

const homeDataPath= path.join(rootDir, 'data', 'home.json');

module.exports = class Home {
    constructor(houseName, price, location, rating){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
    }

    save() {
        this.id = Math.random().toString();
        Home.fetchAll((registeredHouse) => {
              registeredHouse.push(this);
              const homeDataPath= path.join(rootDir, 'data', 'home.json');
              fs.writeFile(homeDataPath, JSON.stringify(registeredHouse), (err)=>{
              console.log(err)
        })
        });      
    }

    static fetchAll(callback) {
        fs.readFile(homeDataPath, (err, data) => {
            if (!err) {
              callback(JSON.parse(data));
            } else {
            callback([]);
            }
        });
    } 

    static findById(homeId, callback) {
        this.fetchAll(homes =>{
            const home = homes.find(home => home.id === homeId);
            callback(home);
        })
    }
}