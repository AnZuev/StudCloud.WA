'use strict';
let log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function* () {
    try{
        let mail = this.request.body.mail;
        this.user = yield UAMS._Users.getUserByMail(mail);
       log.info(this.user);
        this.status = 200;
    }  catch (e){
        throw new ValidationError(400, "Not enough data to process");
    }
};