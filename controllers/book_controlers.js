const Book_Model = require('../models/book_model');


class BookController{



    static async getAllbooks(req,res){
        var result = await Book_Model.getAllbooks();
        if(result){
            res.send(result);
            // return result; 
        }
    }




    static async add_book(req,res){

        // console.log(req.body);
        // console.log(req.file)
        let book_name = req.body.bookName;
        let auther_id = req.body.auther;
        let descreption = req.body.description;
        // //FOR CATEGORY TABLE
        let category = req.body.catigory;
        // // console.log(category);
        let img = req.body.img;
        // // let img = img.name;

        var x = await Book_Model.add_book(book_name,auther_id,descreption,img,category);
        if(x == true){
            res.json(`Add Successful`);
        }
        else{
            res.json('error Added');
        }

    //     var x = await Book_Model.add_auth('name','t.anshasi');

    // if(x == true){
    //         // res.json(`<div class="alert alert-success" role="alert">Add Successful</div>`);
    //         console.log('yes');
    //     }
    //     else{
    //         // res.json('<div class="alert alert-danger" role="alert">error</div>');
    //         console.log('no')
    //     }



    }

    static async edit_book(req,res){

        let id = req.params.id;
        let book_name = req.body.bookName;
        let auther_id = req.body.auther;
        let descreption = req.body.description;
        let category = req.body.catigory;
        let img_name =req.body.img;


        // console.log(id);
        // console.log(book_name);
        // console.log(auther_id);
        // console.log(descreption);
        // console.log(category);
        // console.log(img_name);

        var x = await Book_Model.edit_book(id,book_name,auther_id,descreption,category,img_name);
        if(x == true){
            res.json(`Updated Successful`);}
        else{
            res.json('Error Updated')
        }
    }



    static async delete_book(req,res){

        let id = req.params.id;
        

        // console.log(id);
       

        var x = await Book_Model.delete_book(id);
        if(x){
            res.json(`Deleted successful`);
        }
        else{
            res.json('Error');
        }
    }




    // static async getbook_byid(req,res,book_id){
    //     var result = await Book_Model.getbook_byID(book_id);
    //     if(result){
    //         res.send(result);
    //     }
    // }

}

module.exports = BookController;