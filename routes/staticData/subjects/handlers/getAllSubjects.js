'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const dbError = require("@anzuev/studcloud.errors").DbError;


module.exports = function*() {
    try {
        let str = this.request.query.str;
        let skip = this.request.query.skip;
        log.trace(str + "  " + skip);
        let res = yield SI.getAll(str,skip);
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
       throw e;
    }
};