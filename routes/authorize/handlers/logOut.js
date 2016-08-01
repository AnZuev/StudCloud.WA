'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');

function* a(){
    try {
        let result = yield sso.logout();
        return result;
    } catch (err) {
        log.info(err + "ERROR");
    }
}
module.exports = a;
