const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils')


module.exports = class Home {
    constructor(houseName, price, location, rating){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
    }

    save() {
        registeredHouse.push(this);
        const homeDataPath= path.join(rootDir, 'data', 'home.json');
        fs.writeFile(homeDataPath, JSON.stringify(registeredHouse), (err)=>{
            console.log(err)
        })
    }

    static fetchAll(callback) {
        const homeDataPath= path.join(rootDir, 'data', 'home.json');
        fs.readFile(homeDataPath, (err, data) => {
            if (!err) {
              callback(JSON.parse(data));
            } else {
            callback([]);
            }
        });
    } 
}