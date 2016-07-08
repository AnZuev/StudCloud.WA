'use strict';
let mongoose = require('mongoose');
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');

function* answer(next){
    try {
        let mail = this.request.body.mail;
        let key = mongoose.Types.ObjectId(req.body.key);
        yield this.user.confirmMail(mail,key);
        uams.getUsersByMailConfirmation();
        // yield sso.confirmMail(mail,key);
    } catch (err) {
        log.info(err + "ERROR");
        if (err.code == 400) next(400); //validation err
        else if(err.code == 403) next(403); //auth error
        else return next(err);
    }
}

module.exports = answer;//module 