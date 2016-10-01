'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');


module.exports = function*() {
    let id;
    try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
    }catch (e) {
        throw new ValidationError(400, "Bad data");
    }
    let res = yield SI.disable(id);
    if (res == null) throw new ValidationError(404, "No such subject");
    else this.status = 200;
    this.body = {res: "ok"};
};