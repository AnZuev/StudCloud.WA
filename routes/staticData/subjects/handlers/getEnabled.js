'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
	/**
	 * TODO: Зачем тут try catch? внутри catch ничего не делаем, зачем это тут?
	 */
    try {
        let search = this.request.body.search;
        let skip = this.request.body.skip;
        log.trace(search + "  " + skip);
        let res = yield SI.getEnabled(search,skip);
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
        throw e;
    }
};