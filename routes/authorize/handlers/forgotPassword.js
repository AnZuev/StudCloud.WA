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
        this.user = yield UAMS._Users.getUserByMail(mail); //TODO: вызов UAMS.getUserByMail
        this.session.user = this.user._id; // TODO: почему привязывается сессия? Если я плохой пользователь,
	    //TODO: тогда я смогу отправить запрос на то, что забыл пароль от твоего аккаунта и система привяжет мою
	    //TODO: сессию к твоему аккаунту. Это не есть хорошо


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