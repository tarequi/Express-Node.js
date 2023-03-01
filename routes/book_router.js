const express = require('express');
const fileUpload = require('express-fileupload');
const exceljs = require('exceljs');
const db = require('../config/db');
const bookController = require('../controllers/book_controlers');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('soso');
});

router.use(fileUpload());//FOR UPLODED FILES

//ADD BOOK && CATI_BOOK REQUEST
router.post("/add_book" , bookController.add_book);



/*****************************FOR EXCEL SHHET*********************************/
router.get('/ex_to_excel' , (req,res) => {
    let sql = 'SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id GROUP BY book_catigory.book_id'; 
    db.query(sql, (error, results) => {
        // (C1) EXTRACT DATA FROM DATABASE
        if (!error){
            try{
                let workbook  = new exceljs.Workbook();
                const sheet   =  workbook.addWorksheet('book');
                sheet.columns = [
                    {header : 'Book ID', key: 'id_book', width: 25},
                    {header : 'Book name', key: 'book_name', width: 25},
                    {header : 'Book img', key: 'book_img', width: 25},
                    {header : 'Description', key: 'description', width: 25},
                    {header : 'Auther Name', key: 'auth_name', width: 25},
                    {header : 'Categories', key: 'cat', width: 50}
                ];

                results.map((value,idx) => {
                    sheet.addRow({
                        id_book: value.id_book,
                        book_name: value.book_name,
                        book_img: value.book_img,
                        description: value.description,
                        auth_name: value.auth_name,
                        cat: value.cat,
                    });
                });

                res.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                );
                res.setHeader(
                    'Content-Disposition',
                    'attachment;filename=' + "book.xlsx"
                );

                workbook.xlsx.write(res);
            }
            catch (error){
                console.log(error);
            }
        }
        
        
    });
     
});
/****************************OLD EXPORT TO EXCEL************************/
// router.get('/ex_to_excel' , (req,res) => {
//     let sql = 'SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id GROUP BY book_catigory.book_id'; 
//     db.query(sql, (error, results) => {
//         // (C1) EXTRACT DATA FROM DATABASE
//         if (error) throw error;
//         var data = [];
//         results.forEach((row) => {
//           data.push([row["id_book"], 
//                      row["book_img"],
//                      row["book_name"],
//                      row["auth_name"],
//                      row["description"],
//                      row["cat"]                     
//                     ]);
//         });
       
//         // (C2) WRITE TO EXCEL FILE
//         var worksheet = xlsx.utils.aoa_to_sheet(data),
//             workbook = xlsx.utils.book_new();
//         xlsx.utils.book_append_sheet(workbook, worksheet, "book");
//         xlsx.writeFile(workbook, "demo.xlsx");
//       });
//     //   db.end();
// });


//AJAX REQUEST FOR GET VALUE IN BOX MODEL 
router.get('/get_bookData_for_update/:id',(req,res) => {
    var id_book = req.params.id;
    let sql = `SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE id_book=${id_book}`;
    db.query(sql, (err,result) => {
        if(!err){
            res.send(result);
        }
    });
    // console.log(id_book);
});

//get data for catigory by (book_id)
router.get('/getCatigoryById/:id',(req,res) => {
    var id_book = req.params.id;
    let sql = `SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,category.category_name as cat, category.category_id as cat_id,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE id_book=${id_book}`;
    db.query(sql, (err,result) => {
        if(!err){
            res.json(result);
        }
    });
    // console.log(id_book);
});



router.put('/update_book/:id' , bookController.edit_book);

// router.put('/update_book/:id' , (req,res) => {
//     var id = req.params
// });



router.delete('/delete_book/:id',bookController.delete_book);

router.get('/filter/:name',(req,res) =>{
    var searchValue = req.params.name;
    if(searchValue != ''){
        const sql = `SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE book.book_name LIKE '%${searchValue}%' GROUP BY book_catigory.book_id`;
        db.query(sql,(err,data) => {
            
                res.json(data);
            
        })
    }
});


router.get('/books',(req,res) => {
    //SEND AUTHER DATA FOR SELECT OPTION
    db.query('SELECT * FROM `authers`', (err,data_auth) =>{
        //SEND CATEGORY DATA FOR SELECT OPTION
        db.query('SELECT * FROM `category`', (err,data_category) =>{
        res.render('books' , {title : 'Books' , auther_data : data_auth , category_data : data_category , message : ''});
        });
    }); 
});

router.get('/allBooks',bookController.getAllbooks);

router.get('/getCatigory', (req,res) => {
    db.query('SELECT * FROM `category`', (err,data_category) =>{
        res.send(data_category);
    });
});

router.get('/getAllAuthers' , (req,res) => {
    db.query('SELECT * FROM `authers`' ,(err , authData) =>{
        res.send(authData);
    })
});


router.get("/ee", (req,res)=>{
    res.send("sssssssss");
})

router.get('/soso',(req,res) => {

    var draw = req.query.draw;

    var start = req.query.start;

    var length = req.query.length;

    var order_data = req.query.order;

    if(typeof order_data == 'undefined')
    {
        var column_name = 'book.id_book';

        var column_sort_order = 'desc';
    }
    else
    {
        
        var column_index = req.query.order[0]['column'];

        var column_name = req.query.columns[column_index]['data'];

        var column_sort_order = req.query.order[0]['dir'];
    }

    var search_value = req.query.search['value'];

    var search_query = `book.book_name LIKE '%${search_value}%' GROUP BY book_catigory.book_id`;
    
    //for total record
    let sql = `SELECT  COUNT(*) OVER () AS Total,book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id GROUP BY book_catigory.book_id`;

    db.query(sql,(err,data) => {

        var total_records = data[0].Total;
// console.log(total_records);
        let sql2 = `SELECT COUNT(*) OVER () AS Total,book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE ${search_query}`;

        db.query(sql2,(err,data) => {
            var total_records_with_filter = data[0].Total;
            // console.log(total_records_with_filter);

            var query = `SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE  ${search_query} ORDER BY ${column_name} ${column_sort_order} LIMIT ${start}, ${length}`;

            var data_arr = [];

            db.query(query,(err,data) => {
                // var total_records_with_filter = data[0].Total;
                data.forEach(function(row){
                    data_arr.push({
                        'id_book' : row.id_book,
                        'book_name' : row.book_name,
                        'description' : row.description,
                        'cat' : row.cat,
                        'auth_name' : row.auth_name,
                        'book_img' : `<img src="../img/${row.book_img}" style="width: 40px; height:40px">`,
                        'action' : `
                                    <a class="btn btn-success" id="update_book" data-role="update_book" data-id="${row.id_book}" style="width: 80px;">Edit</a>
                                    <a class="btn btn-danger" id="delete_book" data-role="delete_book" data-id="${row.id_book}" style="width: 80px;">Delete</a>
                                `
                    });
                });

                var output = {
                    'draw' : draw,
                    'iTotalRecords' : total_records,
                    'iTotalDisplayRecords' : total_records_with_filter,
                    'aaData' : data_arr
                };
                res.json(output);
                // console.log(query);
            });
        });
    });
});




// router.get('/books',(req,res) => {
//     res.render('books',{title : 'Books',data: bookController.getAllbooks});
    
// });



module.exports = router;