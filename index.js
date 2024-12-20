// Import the modules we need
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql2');

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

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
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;

// Set up CSS
app.use(express.static(__dirname + '/public'));

// __dirname will get the current directory
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');e
app.engine('html', ejs.renderFile);

// Define data
var forumData = {forumName: "Studybeans" };

// Requires the main.js file inside the routes folder 
require("./routes/main")(app, forumData);

//If it runs the web page will listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
