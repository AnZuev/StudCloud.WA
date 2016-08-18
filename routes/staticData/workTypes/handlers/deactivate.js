'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let id = this.request.body.id;
        let res = yield WI.disable(id);
        this.status = 200;
        log.info(res);
    }catch (e){
        if (e.code == 404) throw new ValidationError(404, "No such workType");
        else if(e.err.kind == 'ObjectId') throw new ValidationError(400, "incorrect id");
        throw e;
    }
};