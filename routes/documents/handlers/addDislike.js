'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const Mongoose = require('mongoose');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(){
    let documentId;
    try{
        documentId = Mongoose.Types.ObjectId(this.request.body.id);
    }catch (e){
        throw new ValidationError(400, "Bad document's id");
    }
    let res = yield BI.addDislike(documentId, this.session.user);
    this.body = { done: res };
    this.status = 200;

};
