const registeredHouse =[];

module.exports = class Home {
    constructor(houseName, price, location, rating){
        this.houseName = houseName;
        this.price =price;
        this.location = location;
        this.rating = rating;
    }

    save() {
        registeredHouse.push(this);
    }

    static fetchAll() {
        return registeredHouse;
    }
}