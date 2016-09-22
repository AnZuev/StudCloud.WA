'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');

module.exports = function*(next){
    try {
        this.user = yield UAMS._Users.getUserById(this.session.user); // TODO: user уже в this.user
        let university = this.request.body.university;

	    // TODO: нет проверки на наличие универа у нас в базе
        yield next;
        this.user.changeUniversity(university);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
