'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
// let rds = require('@anzuev/studcloud.rds');

function* a(){
    try {
        let data = {
            password: this.request.body.key,
            mail: this.request.body.mail
        };
        let res = yield sso.user.confirmMail(data);
        log.info(res);
        return res;
    } catch (err) {
        log.info(err + "ERROR");
    }
}
module.exports = a;
