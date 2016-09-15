'use strict';
let log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function* () {
    try{
        let mail = this.request.body.mail;
	    //TODO: нет проверки на наличие почты
        this.user = yield UAMS._Users.getUserByMail(mail);
        Notify.setMailAccounts(mailBoxes); //TODO: настройка только в одном месте


	    //TODO: надо ссылку генерить нормальную, чтобы юзер переходя по ней подтверждал почту
        let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        yield* not.sendToOne(this.user.auth.mail);
        this.body = {result: "ok"};
        this.status = 200;
    }  catch (e){
        log.error(e);
        if(e.code == 404) {
            throw e;
        } else {
	        //TODO: откуда берется ошибка типа ValidationError?
            throw new ValidationError(500);
        }
    }
};