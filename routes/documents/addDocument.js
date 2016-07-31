'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
let rds = require('@anzuev/studcloud.rds');
let UI = require(rds.getUniversityModel());
let SI = require(rds.getSubjectModel());
let WI = require(rds.getWorkTypeModel());

function* a(){
    try {
        let document = {
            name: this.request.body.name,
            password: this.request.body.password,
            mail: this.request.body.mail
        };
        let res = yield ;
        log.info(res);
        return res;
    } catch (err) {
        log.info(err + "ERROR");
    }
}
module.exports = a;
