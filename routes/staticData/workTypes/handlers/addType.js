'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const WI = RDS.getWorkTypeModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*() {
    try {
        let w = new WI;
        w.title = this.request.body.title;
        if (w.title < 1) throw new ValidationError(400, "Title is too short");
        else {
            let a = yield w.saveType();
            log.info(a);
            this.body = {
                id: w._id,
                title: w.title,
                created: w.created
            };
            this.status = 200;
        }
    }catch (e){
        if(e.code == 11000 || e.code == 11001) throw new ValidationError(400, "Such type also exist");
        else{
            throw new ValidationError(500);
        }
    }
};