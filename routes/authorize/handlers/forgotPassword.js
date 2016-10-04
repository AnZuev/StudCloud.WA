'use strict';
let log = require(appRoot + '/libs/log');
const SSO = require('@anzuev/studcloud.sso');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Util = require('util');
const host = require(appRoot+ "/config").get('host');

module.exports = function* () {
    try{
        log.info(this.user);
        let mail = this.request.body.mail;
        this.user = yield UAMS.getUserByMail(mail);

        let a = this.user.requestPasswordChange();
        let link = Util.format("%sauth/confirmPasswordToken?key=%s&mail=%s",host,a,mail);
        log.trace(link);
        let not = new (Notify.getMailConfirmNotification())(link);
        yield not.sendToOne(this.user.auth.mail);

        yield this.user.saveUser();
        this.status = 200;
    }  catch (e){
        log.error(e);
        throw new ValidationError(400, "Not enough data to process");
    }
};