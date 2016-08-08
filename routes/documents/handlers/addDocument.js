'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
let rds = require('@anzuev/studcloud.rds');
let UI = rds.getUniversityModel();
let SI = rds.getSubjectModel();
let WI = rds.getWorkTypeModel();
// var mongoose = require(appRoot+"/libs/mongoose");

module.exports = function*(){
    try {
        log.info(this.request.body);
        let document = this.request.body;
        this.user = req.session.user;
        log.info(this.user);
        // document.author = mongoose.Types.ObjectId(req.session.user);
        // document.search.cType = mongoose.Types.ObjectId(this.request.body.search.type);
        // document.search.subject = mongoose.Types.ObjectId(this.request.body.search.subject);
        document.search.universities = this.user.university;
        document.search.faculties = this.user.faculty;
        document.search.year = this.user.year;
        // let res = yield ;
        // log.info(res);
        // return res;
    } catch (err) {
        log.info(err + "ERROR");
    }
};
