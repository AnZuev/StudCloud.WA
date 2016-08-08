'use strict';
let log = require(appRoot + '/libs/log');
const SSO = require('@anzuev/studcloud.sso');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function* () {
    try{
        let mail = this.request.body.mail;
        let key = this.request.body.key;
        this.user = yield UAMS._Users.getUserByMail(mail);
        this.state.passwordKey = key;
        log.info(this.user);
        let a = yield SSO.confirmPasswordChange.call(this);
        log.info(a);
        log.info(this.user);

        yield this.user.saveUser();
        log.info(this.user);
        if(a == true){
            this.body = true;
            this.status = 200;
        }else{
            this.status = 400;
        }
        // log.info(a);
        // this.user.authActions.changePassword.key = a;
        // а это наш ключ, его надо скинуть юзеру, чтобы он пришел с ним менять пароль
        // log.info(this.user);

        // send mail
        // Notify.setMailAccounts(mailBoxes);
        // let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        // yield not.sendToOne(this.user.auth.mail);

        // this.status = 200;
    }  catch (e){
        log.error(e);
        throw new ValidationError(400, "Not enough data to process");
    }
};