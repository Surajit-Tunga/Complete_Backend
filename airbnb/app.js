//core modules
const path = require('path');

// External Module
const express= require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH ="mongodb+srv://Surajit:root@cluster0.zrnzytr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Import Routes
const storeRouter =require('./routes/storeRouter');
const {hostRouter} = require('./routes/hostRouter');
const rootDir = require("./utils/pathUtils");
const { notFound } = require('./controllers/error');
const { default: mongoose } = require('mongoose');
const { authRouter } = require('./routes/authRouter');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
})

app.use(express.urlencoded());
// It is a middleware in Express.js used to parse incoming requests with URL-encoded payloads, typically from HTML form submissions.
// The parsed data is available on req.body.

app.use(session({
  secret: "Complete Backend",
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.use(express.static(path.join(rootDir, 'public')));
app.use((req, res, next)=>{
  req.isLoggedIn = req.session.isLoggedIn;
  next();
});
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next)=>{
  if(req.isLoggedIn){
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host",hostRouter);
app.use(notFound);


const PORT = 3000;
mongoose.connect(DB_PATH).then(()=>{  
    app.listen(PORT,()=>{
    console.log(`the server is running at http://localhost:${PORT}`)
  });
}).catch(err=>{
  console.log(err);
})