'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*(){
	// TODO: Зачем try catch?
	try {
        let id = this.request.query.id;
		// TODO: что будет, если кривой id?
        let res = yield BI.getById(id);
        log.info(res);
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};