'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const SSO = require('@anzuev/studcloud.sso');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(next){
    try {
        let year = this.request.body.year;
    } catch (e) {
        throw new ValidationError (400, "No year");
    }
    if (year > 0 && year < 7) {
        yield next;
        this.user.changeUniversity(year);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        this.status = 200;
    } else {
        throw new ValidationError(400, "Year is incorrect")
    }
};