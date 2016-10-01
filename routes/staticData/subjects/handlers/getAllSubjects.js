'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const dbError = require("@anzuev/studcloud.errors").DbError;


module.exports = function*() {
    let search,skip;
    try {
        search = this.request.query.search || "";
        skip = this.request.query.skip;
    } catch(e) {
        throw new ValidationError(400, "Not enough data");
    }
        let res = yield SI.getAll(search,skip);
	    // TODO: когда отдаем предметы, не передает туда дату добавления, модицикаци и версию
        this.body = res; // сделать выборку
        this.status = 200;
        log.info(res);
};