'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');

module.exports = function*() {
    let id,newTitle;
    try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
        newTitle = this.request.body.newTitle;
    }catch (e) {
        throw new ValidationError(400, "Bad data");
    }
    if (!newTitle || newTitle.length < 1) throw new ValidationError(400,"too short title");
    let res = yield SI.setName(id,newTitle);
    if (res == null) throw new ValidationError(404, "No such subject");
    this.body = res;
    this.status = 200;
};