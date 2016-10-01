'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const Mongoose = require('mongoose');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();


module.exports = function*(next){
    let faculty;
    try {
        faculty = Mongoose.Types.ObjectId(this.request.body.faculty);
    } catch (e){
        throw new ValidationError(400, "Bad faculty id");
    }
    if (yield UI.isExist(this.user.pubInform.university, faculty)) {
        yield next;
        this.user.changeFaculty(faculty);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        this.status = 200;
    } else {
        throw new ValidationError(400, "No such faculty in this university");
    }
};