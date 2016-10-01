//TODO: DELETE
'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;


module.exports = function*(){
    try {
        log.trace(this.session.user);
        this.user = yield UAMS._Users.getUserById(this.session.user);
        log.info(this.user);
        this.user.changeUniversity(this.request.body.university);
        this.user.changeFaculty(this.request.body.faculty);
        this.user.changeYear(this.request.body.year);
        yield this.user.saveUser();
        // this.session.university = this.request.body.university;
        // this.session.faculty = this.request.body.faculty;
        // this.session.year = this.request.body.year;
        log.info(this.user);
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw(err);
    }
};
