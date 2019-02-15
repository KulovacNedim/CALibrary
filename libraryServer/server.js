var express = require('express');
var app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'librarydb'
});

// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 


app.use(cors(corsOptions));
 
global.__basedir = __dirname;


// request routers
let fileRouter = require('./app/routers/file.router.js');
app.use('/', fileRouter);

let usersRouter = require('./app/routers/user.router.js');
app.use('/users', usersRouter)

let booksRouter = require('./app/routers/book.router.js')
app.use('/books', booksRouter)



let server = app.listen(8080, () => {

  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port); 
})