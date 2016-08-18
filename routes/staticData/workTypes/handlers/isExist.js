'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let id = this.request.body.id;
        let res = yield WI.isExist(id);
        this.body = {result: res};
        this.status = 200;
        log.info(res);
    }catch (e){
        if(e.err.kind == 'ObjectId') throw new ValidationError(400, "incorrect id");
        throw e;
    }
};