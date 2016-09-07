'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');

const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const DM = require('@anzuev/studcloud.datamodels').Document;


module.exports = function*(){
    try {
        let documentId = this.request.body.id;
        this.document = yield BI.getById(documentId);
        let part = {
          url: this.request.body.url
        };
        log.info(part.url);
        this.document.addPart(part);
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
