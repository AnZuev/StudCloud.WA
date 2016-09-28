'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();

module.exports = function*(){
	// TODO: Зачем try catch?
    try {
        let id = this.request.query.id;
        let date = new Date();
        let res = yield BI.getComments(id, date);
        this.body = res;
        if(res.length == 0) throw new ValidationError(204,"No comments");
        this.status = 200;
    }catch (err) {
        log.err(err);
        throw err;
    }
};
