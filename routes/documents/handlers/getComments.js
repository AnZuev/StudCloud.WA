'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const Mongoose = require('mongoose');

module.exports = function*(){
    let id;
    try {
        id = Mongoose.Types.ObjectId(this.request.query.id);
    }catch(e){
        throw new ValidationError(400, "Bad data");
    }
    let date = new Date();
    let res = yield BI.getComments(id, date);
    this.body = res;
    if(res.length == 0) throw new ValidationError(204,"No comments");
    this.status = 200;

};
