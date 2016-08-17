'use strict';
const log = require(appRoot + '/libs/log');
const RDS = require('@anzuev/studcloud.rds');
const SI = RDS.getSubjectModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*() {
    try {
        let s = new SI;
        s.title = this.request.body.title;
        if (s.title < 1) throw new ValidationError(400, "Title is too short");
        else {
            let a = yield s.saveSubject();
            log.info(a);
            this.body = {
                id: s._id,
                title: s.title,
                created: s.created
            };
            this.status = 200;
        }
    }catch (e){
        if(e.code == 11000 || e.code == 11001) throw new ValidationError(400, "Such subject also exist");
        else{
            throw new ValidationError(500);
        }
    }
};