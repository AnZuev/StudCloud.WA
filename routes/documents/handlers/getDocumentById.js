'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*(){
	// TODO: Зачем try catch?
	try {
        let id = this.request.query.id;
        let res = yield BI.getById(id);
        if(!res || res.length == 0)
            throw new ValidationError(204,"No such document");
        this.body = res;
        this.status = 200;
    }catch (err) {
        if (err.code == 500)
            throw new ValidationError(400, "Bad id");
        log.err(err);
        throw err;
    }
};