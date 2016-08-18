'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let title = this.request.query.title || ""; //regex
        // title = new RegExp(title, "ig");
        title = '^' + title;
        title = new RegExp(title, "i");
        log.info(title);
        let format = this.request.query.format;
        let university = this.request.query.university;
        let res = yield UI.getFacultiesByTitle(title,university,format);
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
        throw e;
    }
};