const db = require('../config/db');


class Book_Model{
    static async getAllbooks(){
        return new Promise (resolve => { 
            let sql = 'SELECT book.book_img,book.id_book,book.book_name,book.autherAuthId,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.bookIdIdBook = book.id_book LEFT JOIN category ON category.category_id = book_catigory.catiIdCategoryId LEFT JOIN authers ON authers.auth_id = book.autherAuthId GROUP BY book_catigory.bookIdIdBook';
            db.query(sql, (err,result) => {
                if(!err){
                    resolve(result);
                }
            });
        }); 
    }    


    // static async getbook_byID(id_book){
    //     return new Promise (resolve => {
    //         let sql = `SELECT book.book_img,book.id_book,book.book_name,book.auther_id,book.description ,GROUP_CONCAT(category.category_name) as cat,authers.auth_name FROM book LEFT JOIN book_catigory ON book_catigory.book_id = book.id_book LEFT JOIN category ON category.category_id = book_catigory.cati_id LEFT JOIN authers ON authers.auth_id = book.auther_id WHERE id_book=${id_book}`;
    //         db.query(sql, (err,result) => {
    //             if(!err){
    //                 resolve(result);
    //             }
    //         });
    //     }); 
    // }  


    static async delete_book(id_book){
        return new Promise (resolve => {
            db.query(`DELETE FROM book WHERE id_book=${id_book}`, (err,result) => {
                if(!err){
                    resolve(result);
                }
            });
        }); 
    }  







    // static async add_auth(name,email){
    //     return new Promise(resolve => {
    //         db.query('INSERT INTO `authers` (auth_name,auth_email) VALUES(?,?)',[name,email], (err,result) => {
    //             if(!err){
    //                 resolve(true);
                   
    //             }
    //             else{
    //                 resolve(false);
    //             }
    //         });
    //     });
    // }










    static async add_book(book_name,auther_id,description,book_img,category){
        return new Promise(resolve => {
            db.query('INSERT INTO `book` (book_name,auther_id,description,book_img) VALUES(?,?,?,?)',[book_name,auther_id,description,book_img], (err,result) => {
                if(!err){
                    resolve(true);
                    //GET LAST INSERTED ID FOR TABLE book_catigory  
                    var inserted_id =  result.insertId;
                    for(let i = 0 ; i< category.length ; i++){
                        db.query(`INSERT INTO book_catigory (book_id,cati_id) VALUES(?,?)`,[inserted_id,category[i]], (err,result) => {
                            if(!err){
                                resolve(true);
                                // console.log(category[i]);
                            }
                            else{
                                resolve(false);
                                // console.log(category);
                            }
                        });
                    }
                }
                else{
                    resolve(false);
                    console.log(err);
                }
            });
        });
    }

    static async edit_book(id,book_name,auther_id,descreption,category,img_name){
        return new Promise (resolve => {
            let sql = `update book set book_name=?,auther_id=?,description=?,book_img=? WHERE id_book=${id}`;
            db.query(sql,[book_name,auther_id,descreption,img_name] , (err,result) => {
                if(!err){
                    resolve(true);
                        let sql_delete = `DELETE FROM book_catigory WHERE book_id=${id}`;
                        db.query(sql_delete, (err,result) => {
                            if(!err){
                                resolve(true);
                                for(let i = 0 ; i< category.length ; i++){
                                    db.query(`INSERT INTO book_catigory (book_id,cati_id) VALUES(?,?)`,[id,category[i]], (err,result) => {
                                        if(!err){
                                            resolve(true);
                                            // console.log(category[i]);
                                        }
                                        else{
                                            resolve(false);
                                            // console.log(category);
                                        }
                                    });
                                }
                            }
                            else{
                                resolve(false);
                                // console.log(category);
                            }
                        });
                }
            });
        });
    }


}

module.exports = Book_Model;