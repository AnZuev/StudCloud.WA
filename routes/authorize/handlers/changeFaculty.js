'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const SSO = require('@anzuev/studcloud.sso');
const AuthError = require("@anzuev/studcloud.errors").AuthError;

module.exports = function*(next){
    try {
        let faculty = this.request.body.faculty;
        yield next;
        this.user.changeFaculty(faculty);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        this.status = 200;
    }catch (err) {
        if (err.code == 401) throw new AuthError(401);
        log.info(err);
        throw(err);
    }
};