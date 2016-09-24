'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const SSO = require('@anzuev/studcloud.sso');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(next){
	/*
	 * TODO: зачем тут try catch?
	 * Если надо залогировать ошибку, то это можно один раз сделать в app.js
	 */
    try {
        let year = this.request.body.year;
        if (year > 0 && year < 7) {
            yield next;
            this.user.changeUniversity(year);
            yield this.user.saveUser();
            this.body = {result: "ok"};
            this.status = 200;
        } else {
            throw new ValidationError(400, "Year is incorrect")
        }

    }catch (err) {
        log.info(err);
        throw(err);
    }
};