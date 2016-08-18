'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*() {
    try {
        let search = this.request.query.search;
        let skip = this.request.query.skip;
        log.trace(search + "  " + skip);
        let res = yield WI.getDisabled(search,skip);
        this.body = res;
        this.status = 200;
        log.info(res);
    } catch (e){
        throw e;
    }
};