'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');


module.exports = function*(next){
    try {
        let university = Mongoose.Types.ObjectId(this.request.body.university);
        yield UI.getById(university);
    }catch(e) {
        throw new ValidationError(400, "Bad university id");
    }
    yield next;
    this.user.changeUniversity(university);
    yield this.user.saveUser();
    this.body = {result: "ok"};
    this.status = 200;

};
