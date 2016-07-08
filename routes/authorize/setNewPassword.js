'use strict';
let mongoose = require('mongoose');
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');

function* answer(req,res,next){
    try {
        let mail = req.body.mail;
        let key = mongoose.Types.ObjectId(req.body.key);
        yield sso.confirmMail(mail,key);
    } catch (err) {
        log.info(err + "ERROR");
        if (err.code == 400) next(400); //validation err
        else if(err.code == 403) next(403); //auth error
        else return next(err);
        
    }
}
let k = answer().next();

module.exports = k;