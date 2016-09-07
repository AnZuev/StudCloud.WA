'use strict';
const log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');

module.exports = function*(){
    try {
        this.user = yield UAMS._Users.getUserById(this.session.user);
        this.user.changeYear(this.request.body.year);
        yield this.user.saveUser();
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw(err);
    }
};