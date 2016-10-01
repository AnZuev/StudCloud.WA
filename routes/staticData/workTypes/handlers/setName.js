'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');

module.exports = function*() {
    let id, newTitle;
    try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
        newTitle = this.request.body.newTitle;
    }catch(e) {
        throw new ValidationError(400, "Bad data");
    }
    if (newTitle.length < 1) throw new ValidationError(400, "too short title");
    yield WI.setName(id, newTitle);
    this.status = 200;
};