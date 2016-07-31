'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
let rds = require('@anzuev/studcloud.rds');

function* a(){
    try {
        let authData = {
            name: this.request.body.name,
            password: this.request.body.password
        };
        let user = yield sso.signIn(authData);
        return user;
    } catch (err) {
        log.info(err + "ERROR");
    }
}
module.exports = a;
