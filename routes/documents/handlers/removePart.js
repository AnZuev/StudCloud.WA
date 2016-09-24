'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');
const BI = BZ.getModel();

module.exports = function*(){
	// TODO: Зачем try catch?
	try {
        let documentId = this.request.body.documentId;
        let partId = this.request.body.partId;
		//TODO: зачем в this.document записывать документ?
        this.document = yield BI.getById(documentId);
        this.document.removePart(partId);
        yield this.document.saveDoc();
        let res = yield BI.getById(documentId);
        log.trace(res);
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
