const express = require('express');
const myDb    = require('./config/db');
const cors = require('cors');
const body_barser = require('body-parser');//for get data from (form to router)

/***********************************ROUTES**********************/
const rout_book = require('./routes/book_router'); 
const rout_view_books = require('./routes/book_view_router'); 

/***********************************ROUTES**********************/



const app = express();

//TO ENABLE THE REQUESTS FROM FRONTEND
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    next();
  });

// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());


/***********************************ROUTES**********************/

app.use(rout_book);
app.use(rout_view_books);

var corsOptions = {
    origin: "http://localhost:4200"
  };
app.use(cors(corsOptions));



/***********************************ROUTES**********************/


//for javascript  && CSS and IMG files
app.use('/css' ,express.static('./css/'));
app.use("/js", express.static('./js/'));
app.use("/img", express.static('./img/'));
/***************EJS*****************/
app.set('view engine' , 'ejs');
/***************EJS*****************/


app.listen(3000,() => {
    console.log('Server Is Running');
});


//(SHOULD BE THE LAST ONE)
//404
app.use((req,res) => {
    res.status(404).render('404',{title : 'Error Not Found'});
});


// import { Express } from 'express';