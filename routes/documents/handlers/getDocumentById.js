'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(){
    try {
        let id = this.request.query.id;
        let res = yield BI.getById(id);
        log.info(res);
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};