'use strict';

let Q = require('q');

let config = require('../config');

let sso = require('@anzuev/studcloud.sso');
sso.init();

Q.async(function*(req, res, next){
    var mail = req.query.mail || "";
    var key = req.query.key || "";

    try{
        return(yield sso.confirmMail(mail,key));
    }catch(err){
        if(err.code == 500) return next(500);
        if(err.code == 403) return next(403, err.message);
        else next(err);

    }
});