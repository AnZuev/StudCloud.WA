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
        let password = this.request.body.password;
        log.info(this.session.user);
        // log.info("ability" + this.session.actions.passwordChange);

        let a = yield SSO.isPasswordChangeAllowed(this.session);
        log.trace(a);
        if( a == true) {
            this.user.setNewPassword(password);
            yield SSO.dropPasswordChangeAccess.call(this);
            yield this.user.saveUser();
            this.body = {result: "ok"};
            this.status = 200;

            //send mail "your password was changed"
        } else{
            this.body = {result: "failed"};
            throw new ValidationError(400);
        }
    }  catch (e){
        log.error(e);
        this.body = {result: "failed"};
        throw new ValidationError(400, "Not enough data to process");
    }
};