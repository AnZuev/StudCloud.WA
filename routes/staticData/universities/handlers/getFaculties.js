'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    let title, format, university;
    try {
        title = this.request.query.title || ""; //regex
        format = this.request.query.format;
        university = this.request.query.university;
    }catch (err) {
        throw new ValidationError(400, "Bad data");
    }
    let res = yield UI.getFacultiesByTitle(title,university,format);
    this.body = res;
    this.status = 200;

};