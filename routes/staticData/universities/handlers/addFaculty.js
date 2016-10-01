'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const Mongoose = require('mongoose');


module.exports = function*() {
    let id, title, shortTitle;
    try {
        id = Mongoose.Types.ObjectId(this.request.body.id);
        title = this.request.body.title;
        shortTitle = this.request.body.shortTitle;
    }catch (e) {
        throw new ValidationError(400, "Bad data");
    }
    let s = yield UI.getById(id);
    let condition = title && shortTitle;
    if(condition == undefined) throw new ValidationError(400, "Fill each parameter");
    else {
        s.addFaculty(title,shortTitle);
        yield s.saveUniversity();
        this.status = 200;
    }
};