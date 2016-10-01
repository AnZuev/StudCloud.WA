'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const UI = RDS.getUniversityModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*() {
    try {
        let s = {
            title: this.request.body.title,
            shortTitle: this.request.body.shortTitle,
            city: this.request.body.city,
            street: this.request.body.street,
            building: this.request.body.building,
            rating: this.request.body.rating
        };
    }catch (err) {
        throw new ValidationError(400, "Bad data");
    }
    try{
        let condition = s.title && s.shortTitle && s.city && s.street && s.building && s.rating;
        if(condition == undefined) throw new ValidationError(400, "Fill each parameter");
        else {
            let a = yield UI.createNew(s.title, s.shortTitle, s.street, s.building, s.city, s.rating);
            this.body = yield a.formatForSearch(true);
            this.status = 200;
        }
    }catch (e){
        if(e.code == 11000 || e.code == 11001) throw new ValidationError(400, "Such university also exist");
        else{
            log.error(e);
            throw e;
        }
    }
};