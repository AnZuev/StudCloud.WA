'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');

const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const DM = require('@anzuev/studcloud.datamodels').Document;


module.exports = function*(){
    try {
        this.user = yield UAMS._Users.getUserById(this.session.user); // можно убрать, если не нужен ник
        let documentId = this.request.body.id;
        this.document = yield BI.getById(documentId);
        let res = yield BI.addDislike(documentId, this.session.user);
        yield this.document.saveDoc();
        log.trace(yield BI.getById(documentId));
        this.body = { done: res };
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
