'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');

module.exports = function*() {
    let id;
    try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
    }catch(e) {
        throw new ValidationError(400, "Bad data");
    }
    let res = yield WI.isExist(id);
    this.body = {result: res};
    this.status = 200;
};