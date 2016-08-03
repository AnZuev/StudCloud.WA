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
        Notify.setMailAccounts(mailBoxes);
        let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        yield not.sendToOne(this.user.auth.mail);
        this.status = 200;
    }  catch (e){
        throw new ValidationError(400, "Not enough data to process");
    }
};