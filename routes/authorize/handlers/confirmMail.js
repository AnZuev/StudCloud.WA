'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
let rds = require('@anzuev/studcloud.rds');

function* a(){
    try {
        let mail = this.request.body.mail;
        let key = this.request.body.key;
        let confirmation = yield sso.confirmMail(mail,key);
        return confirmation;
    } catch (err) {
        log.info(err + "ERROR");
    }
}
module.exports = a;
