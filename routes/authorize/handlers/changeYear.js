'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');

module.exports = function*(){
    try {
        this.user = yield UAMS._Users.getUserById(this.session.user); //TODO: user уже в this.user
        let year = this.request.body.year;

	    //TODO: нет проверки на валидность курса
        this.user.changeUniversity(year);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw(err);
    }
};