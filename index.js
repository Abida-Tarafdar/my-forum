// Setup express and ejs and sql
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql2');

// Create the express application object
const app = express();
const port = 8000;

// Tell Express that we want to use EJS as the templating engine

app.set('view engine', 'ejs');

// Set up the body parser 
app.use(express.urlencoded({ extended: true })); 

// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);


//app.use(bodyParser.urlencoded({ extended: true }));

// Define the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'appuser',
  password: 'app2027',
  database: 'myForum' 
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed');
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

// Set up CSS
app.use(express.static(__dirname + '/public'));

// __dirname will get the current directory
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);


//error catch handling for unexpected errprs
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

//If it runs the web page will listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
