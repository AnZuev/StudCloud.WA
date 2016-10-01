'use strict';
let log = require(appRoot + '/libs/log');
const SSO = require('@anzuev/studcloud.sso');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function* () {
    try{
        log.info(this.user);
        let mail = this.request.body.mail;
        this.user = yield UAMS.getUserByMail(mail);

        // log.trace(this.session.user);
        let a = this.user.requestPasswordChange();
        // log.info(a);
        // this.user.authActions.changePassword.key = a;
        // а - это наш ключ, его надо скинуть юзеру, чтобы он пришел с ним менять пароль
        // log.info(this.user);

        // TODO: send mail
        // Notify.setMailAccounts(mailBoxes);
        // let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        // yield not.sendToOne(this.user.auth.mail);

        yield this.user.saveUser();
        this.status = 200;
    }  catch (e){
        log.error(e);
        throw new ValidationError(400, "Not enough data to process");
    }
};