'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');

module.exports = function*(){
    try {
<<<<<<< HEAD
        this.user = yield UAMS.getUserById(this.session.user);
=======
        this.user = yield UAMS._Users.getUserById(this.session.user); // TODO: user уже в this.user
>>>>>>> origin/master
        let university = this.request.body.university;

	    // TODO: нет проверки на наличие универа у нас в базе
        this.user.changeUniversity(university);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
