'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*() {
    let search, skip;
    try {
        search = this.request.query.search;
        skip = this.request.query.skip;
    }catch(e) {
        throw new ValidationError(400, "Bad data");
    }
    let res = yield WI.getAll(search,skip);
    this.body = res;
    this.status = 200;
};