'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let id = this.request.body.id;
        let res = yield SI.enable(id);
        log.info(res);
        if (res == null) throw new ValidationError(404, "No such subject");
        else this.status = 200;
    }catch (e){
        if (e.code == 404) throw e;
        else if(e.err.kind == 'ObjectId') throw new ValidationError(400, "incorrect id");
        throw e;
    }
};