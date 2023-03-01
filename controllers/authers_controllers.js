const Authers_Model = require('../models/auther_model');


class AuthersController{
    static async getAllauthers(req,res){
        var result = await Authers_Model.getAllAuthers();
        if(result){
            res.send(result);
            // return result;
        }
    }
}

module.exports = AuthersController;