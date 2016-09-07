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
        let res = yield BI.addWatch(documentId);
        this.body = { done: res };
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
