const db = require('../config/db');


class Auther_model{
    static async getAllAuthers(){
        return new Promise (resolve => {
            let sql = 'SELECT * FROM `authers`';
            db.query(sql, (err,result) => {
                if(!err){
                    resolve(result);
                }
            });
        }); 
    }    
}

module.exports = Auther_model;