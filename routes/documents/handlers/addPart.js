'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const Mongoose = require('mongoose');

module.exports = function*(){
    let documentId, part;
    try {
        documentId = Mongoose.Types.ObjectId(this.request.body.id);
        part = {
            url: this.request.body.url
        };
    }catch(e){
        throw new ValidationError(400, "Bad data");
    }
    
    this.document = yield BI.getById(documentId);
    this.document.addPart(part);
    yield this.document.saveDoc();
    let res = yield BI.getById(documentId);
    this.body = res;
    this.status = 200;
};
