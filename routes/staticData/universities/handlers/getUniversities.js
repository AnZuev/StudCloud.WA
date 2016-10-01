'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    let title, format;
    try {
        title = this.request.query.title || "";
        format = this.request.query.format;
    }catch (err) {
        throw new ValidationError(400, "Bad data");
    }
    let res = yield UI.getUniversitiesByTitle(title,format);
    this.body = res;
    this.status = 200;
};