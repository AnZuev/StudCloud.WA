'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();

module.exports = function*(){
	// TODO: Зачем try catch?
	try {
        let documentId = this.request.body.documentId;
        let partId = this.request.body.partId;
		//TODO: зачем в this.document записывать документ?
        let document = yield BI.getById(documentId);
        document.removePart(partId);
        yield document.saveDoc();
        let res = yield BI.getById(documentId);
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.err(err);
        throw err;
    }
};
