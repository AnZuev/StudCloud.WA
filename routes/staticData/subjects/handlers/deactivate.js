'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let id = this.request.body.id;
        let res = yield SI.disable(id);
        this.status = 200;
        log.info(res);
    }catch (e){
        throw e;
    }
};