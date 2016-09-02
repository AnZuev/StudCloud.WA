'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(){
    try {
        let id = this.request.query.id;
        let date = this.request.query.date;
        log.info(this.request.query);
        let res = yield BI.getComments(id, date);
        log.info(res);
        if (res.length == 0) throw new ValidationError(204);
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
