'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const Mongoose = require('mongoose');
const BI = BZ.getModel();

module.exports = function*() {
    let documentId, partId;
    try {
        documentId = Mongoose.Types.ObjectId(this.request.body.documentId);
        partId = Mongoose.Types.ObjectId(this.request.body.partId);
    } catch (e) {
        throw new ValidationError(400, "Bad data");
    }

    let document = yield BI.getById(documentId);
    document.removePart(partId);
    yield document.saveDoc();
    this.body = yield BI.getById(documentId);
    this.status = 200;
};
