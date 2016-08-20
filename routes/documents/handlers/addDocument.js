'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

// var mongoose = require(appRoot+"/libs/mongoose");

module.exports = function*(){
    try {
        log.info(this.session);
        // log.info(this.request.body);
        let document = new BI;
        // this.user = this.session.user;

        document.title = this.request.body.title;
        if (document.title < 1) throw new ValidationError(400, "Too short title");
        else {
            document.author = this.session.user;
            document.search.cType = this.request.body.search.type;
            document.search.subject = this.request.body.search.subject;
            document.search.universities = this.session.user.university;
            document.search.faculties = this.session.user.faculty;
            document.search.year = this.session.user.year;
            let res = yield BZ.saveDoc();
            log.info(res);
        }
    } catch (err) {
        log.info(err);
    }
};
