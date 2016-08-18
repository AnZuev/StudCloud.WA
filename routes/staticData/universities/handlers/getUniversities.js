'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let title = this.request.query.title || "";
        let format = this.request.query.format;
        let res = yield UI.getUniversitiesByTitle(title,format);
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
        throw e;
    }
};