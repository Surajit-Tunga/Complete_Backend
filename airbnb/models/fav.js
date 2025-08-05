const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathUtils')

const favDataPath= path.join(rootDir, 'data', 'fav.json');

module.exports = class fav {
     static addFavourites(id, callback) {
         fav.getFavourites((favourites) => {
                    if (favourites.includes(id)) {
                        console.log("Home already in favourites");
                    } else {
                        favourites.push(id);
                        const favDataPath= path.join(rootDir, 'data', 'fav.json');
                        fs.writeFile(favDataPath, JSON.stringify(favourites), callback);
                    }
                });  
     }
     static getFavourites(callback){
        fs.readFile(favDataPath, (err, data) => {
          callback(!err ? JSON.parse(data) : []);
        });
     }
     static deleteById(delHomeId, callback) {
        fav.getFavourites(homeIds =>{
            homeIds = homeIds.filter(homeId => delHomeId !== homeId);
            fs.writeFile(favDataPath, JSON.stringify(homeIds), callback);
        })
      }
    }