# File Handling 

## Adding File Picker
- In add-home form
```html
  <input 
    type="file" 
    name="photo" 
    accept = "image/*"
    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
  />
```
---

## Multipart Form
1. Downlod multer package
```bash
npm i multer
```
2.  Update the form
```html
<form action="/host/<%= editing ? 'edit-home/': 'add-home' %>" method="POST" enctype="multipart/form-data" class="space-y-4">
```
3. Use multer in app.js
```js
const multer =require('multer');

//---
app.use(express.urlencoded());
app.use(multer().single('photo')); //update 
app.use(express.static(path.join(rootDir, 'public')));
```
4. To log the file
```js
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, photo, description} = req.body;
    const home = new Home({houseName,price,location, rating, photo, description});
    console.log(req.file); //this
    home.save().then(()=>{
        console.log('Home saved.');
    });
    res.redirect('/host/host-home-list');
}
```
5. Save The Image
```js
//in app.js 
app.use(multer({dest: 'uploads/'}).single('photo'));
```
6. Custom file Name
```js
//in app.js
const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});


const multerOptions = {
  storage
};

app.use(express.urlencoded());

app.use(multer(multerOptions).single('photo'));
```

7. Restricting Upload File Types in server
```js
//app.js
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = {
  storage, fileFilter
};
```
8. Save the img properly in controller
```js
//in host Controller
exports.postAddHome = (req, res, next)=>{
    const {houseName,price,location, rating, description} = req.body;
      
    if(!req.file){ // update
        console.log("No Images Provided");
        return res.status(422).redirect("/host/add-home");
    }
    const photo =req.file.path; //update
    const home = new Home({houseName,price,location, rating, photo, description});
    
    home.save().then(()=>{
        console.log('Home saved.');
    });
    res.redirect('/host/host-home-list');
}
```
9. Update editng:
```js
exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, description} = req.body;
    Home.findById(id).then((home)=>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;
        if (req.file) { //update
            home.photo = req.file.path;
        }
        home.save().then(result =>{
        console.log('Home Updated', result);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect('/host/host-home-list');   
  }).catch(err=>{
        console.log(err);
    })    
}
```
10. Serving The Saved Data
```js
//update app.js
app.use(express.static(path.join(rootDir, 'public')));

//update
app.use("/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')))
app.use("/homes/uploads", express.static(path.join(rootDir, 'uploads')))

app.use(session({
  secret: "Complete Backend",
  resave: false,
  saveUninitialized: true,
  store: store
}));
```
11. Deleting Files
```js
const fs =require("fs");

exports.postEditHome = (req, res, next)=>{
    const {id, houseName, price, location, rating, description} = req.body;
    Home.findById(id).then((home)=>{
        home.houseName = houseName;
        home.price = price;
        home.location = location;
        home.rating = rating;
        home.description = description;
        if (req.file) {
            fs.unlink(home.photo, (err)=>{
               if(err){
                console.log(err);
               }
            });
             home.photo = req.file.path;
        }
        home.save().then(result =>{
        console.log('Home Updated', result);
    }).catch(err=>{
        console.log(err);
    })
    res.redirect('/host/host-home-list');   
  }).catch(err=>{
        console.log(err);
    })    
} 
```