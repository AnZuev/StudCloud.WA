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
        let a = yield SSO.confirmPasswordChange.call(this);
        // log.info("ability " + this.session.actions.passwordChange);
        log.info(a);
        log.info(this.user);
        this.session.user = this.user._id;
        yield this.user.saveUser();

        if(a == true){
            this.body = true;
            this.status = 200;
        }else{
            this.body = false;
            this.status = 400;
        }
    }  catch (e){
        log.error(e);
        throw new ValidationError(400, "Not enough data to process");
    }
};