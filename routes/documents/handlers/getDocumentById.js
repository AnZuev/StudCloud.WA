'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');
const UAMS = require('@anzuev/studcloud.uams');
const RDS = require('@anzuev/studcloud.rds');

module.exports = function*(){
    let id;
    try {
        id = Mongoose.Types.ObjectId(this.request.query.id);
    }catch(e){
        throw new ValidationError(400, "Bad data");
    }
    let res = yield BI.getById(id);
    if(!res || res.length == 0)
        throw new ValidationError(204,"No such document");
    this.body = yield res.formatToSearch(UAMS, RDS.getWorkTypeModel(), this.user);
    this.status = 200;
};