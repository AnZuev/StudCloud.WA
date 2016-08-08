// aa35e1f2986f46ea57a9e2851a07f8c11519c657
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
        let password = this.request.body.password;
        this.user = yield UAMS._Users.getUserByMail(mail);
        log.info(this.session);
        log.info(this.user);
        let a = yield SSO.isPasswordChangeAllowed(this.session);
        log.trace(a);
        // Notify.setMailAccounts(mailBoxes);
        // let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        // yield not.sendToOne(this.user.auth.mail);
        this.user.setNewPassword(password);

        yield SSO.dropPasswordChangeAccess.call(this);
        yield this.user.saveUser();
        this.status = 200;
    }  catch (e){
        log.error(e);
        throw new ValidationError(400, "Not enough data to process");
    }
};