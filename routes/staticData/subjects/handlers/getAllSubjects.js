'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const dbError = require("@anzuev/studcloud.errors").DbError;


module.exports = function*() {
    try {
        let search = this.request.query.search || "";
        let skip = this.request.query.skip;
        log.trace(search + "  " + skip);
        let res = yield SI.getAll(search,skip);
	    // TODO: когда отдаем предметы, не передает туда дату добавления, модицикаци и версию
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
       throw e;
    }
};