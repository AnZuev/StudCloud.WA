'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*() {
    try {
        let id = this.request.body.id;
        let title = this.request.body.title;
        let shortTitle = this.request.body.shortTitle;
        let s = yield UI.getById(id);
        let condition = title && shortTitle;
        if(condition == undefined) throw new ValidationError(400, "Fill each parameter");
        else {
            s.addFaculty(title,shortTitle);
            yield s.saveUniversity();
            this.status = 200;
        }
    }catch (e){
        log.error(e);
        throw e;
    }
};