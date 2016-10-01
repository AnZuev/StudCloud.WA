'use strict';
let log = require(appRoot + '/libs/log');
const SSO = require('@anzuev/studcloud.sso');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function* () {
    let mail,key;
    try {
        mail = this.query.body.mail;
        key = this.query.body.key;
    }catch (e) {
        throw new ValidationError(400, "Not enough data");
    }

    this.user = yield UAMS.getUserByMail(mail);
    this.state.passwordKey = key;
    let a = yield SSO.confirmPasswordChange.call(this);
    this.session.user = this.user._id;
    yield this.user.saveUser();

    if(a){
        this.body = true;
        this.status = 200;
    }else{
        this.body = false;
        this.status = 403;
    }
};