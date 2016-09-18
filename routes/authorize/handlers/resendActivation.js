'use strict';
let log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
// const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function* () {
    try{
        this.user = null;
        let mail = this.user.auth.mail;

	    //TODO: надо ссылку генерить нормальную, чтобы юзер переходя по ней подтверждал почту
        // а как?
        let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        yield* not.sendToOne(mail);
        this.body = {result: "ok"};
        this.status = 200;
    }  catch (e){
        log.error(e);
        if(e.code == 404) {
            throw e;
        } else {
	        //TODO: откуда берется ошибка типа ValidationError?
            throw new ValidationError(400); // кидается когда юзер неверно сформирован
        }
    }
};