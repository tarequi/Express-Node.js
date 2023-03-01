const express = require('express');
const db = require('../config/db');
const router = express.Router();


router.get('/views_book', (req,res) => {
    //SEND book DATA 
    let sql = 'SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id GROUP BY book_catigory.book_id LIMIT 3'; 
    db.query(sql,(err,data_book) => {
        //for limit
        let sql_4_count = 'SELECT  COUNT(*) OVER () AS Total,book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id GROUP BY book_catigory.book_id';
        db.query(sql_4_count,(err,num_record) => {
            //SEND AUTHER DATA FOR SELECT OPTION
            db.query('SELECT * FROM `authers`', (err,data_auth) =>{
                //SEND CATEGORY DATA FOR SELECT OPTION
                db.query('SELECT * FROM `category`', (err,data_category) =>{
                res.render('views_book' , {title : 'Books View' ,
                                            auther_data : data_auth ,
                                            category_data : data_category ,
                                            book_data : data_book,
                                            all_record : num_record[0].Total
                                            });
                });
            }); 
        });
    });
});


//LOAD MORE
router.get("/load_more", function(req, res){
    //Counter Number
    var ajaxLimit = parseInt(req.query.number_limit);
    
    var num = 3;
    let sql = `SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id GROUP BY book_catigory.book_id LIMIT ${ajaxLimit},${num}`; 
    db.query(sql, function(err, results) {
        if (!err){
            res.send(results);
            // console.log(res.Limit);
        } 
    });
});






router.get('/filters' , (req,res) => {
    var search_val =  req.query.search;
    var auther_id =  req.query.id_auther;
    var cati_id =  req.query.id_cati;

    // console.log(search_val);

    // console.log(auther_id);

    // console.log(cati_id);


    let sql = 'SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE 1=1 '; 


    if(search_val !=''){
        sql += `AND (book_name LIKE '%${search_val}%' OR description LIKE '%${search_val}%' OR auth_name LIKE '%${search_val}%')`;
    }


    if(cati_id !=''){
        sql += `AND cati_id ='${cati_id}'`;
    }

    if(auther_id !=''){
        sql += `AND auther_id ='${auther_id}'`;
    }


    sql += 'GROUP BY book_catigory.book_id';
   
    // console.log(sql);
    db.query(sql, (err,result) => {
        if(!err){
            if(result.length == 0){
                res.send("<div class='alert alert-danger' role='alert'>Data Not Found</div>")
            }
            else{
                res.send(result);
            }
            
        }
    });

});

//test to retrieve data to frontend
router.get("/api/room",(req,res) => {

})
















module.exports = router;