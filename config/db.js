const mysql = require('mysql');

//Database Connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Tareq@razan.1234',
    database :  'books'
});

db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('Mysql Connected');
});

//TO USE THIS FILE ANY WHERE
module.exports = db;