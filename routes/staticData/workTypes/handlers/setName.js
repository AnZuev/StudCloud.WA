'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*() {
    try {
        let id = this.request.body.id;
        let newTitle = this.request.body.newTitle;
        if (newTitle.length < 1) throw new ValidationError(400, "too short title");
        let res = yield WI.setName(id, newTitle);
        this.status = 200;
        log.info(res);
    }catch (e){ 
        log.error(e);
        if(e.code == 404) throw new ValidationError(404, "No such workType");
        else if(e.err.kind == 'ObjectId') throw new ValidationError(400, "incorrect id");
        throw new ValidationError(400, e.message);
    }
};