'use strict';
global.appRoot = __dirname + '/';
let config = require('../config');
var log = require(appRoot + '   libs/log');
let sso = require('@anzuev/studcloud.sso');
exports.get = function(req,res,next) {

    var k = function*() {
        let authData = {
            name: "Ant",
            password: "sdkmskdmsf",
            surname: "Zuev",
            mail: "paul.osmolovsky@gmail.com"
        };
        try {


            let user = yield sso.signUp(authData);
            // let user = yield sso.signIn(authData);
            // let res = yield sso.checkPermissionToGetFile(user, '575eb3749ded7fef0bdbf08c');
            // let res = yield sso.setPasswordKey(authData.mail);
            // let res = yield sso.setPassword(authData.mail, authData.password, '');
            // let user = yield sso.confirmMail(authData.mail, '03df24bcce1e45b231876fe5b2c405b0a4940ebc');
            // console.log(res);

        } catch (err) {
            log.info(1);
            throw err;
        }
    };
    try {
        log.info("2");
        k.next();
    } catch (e) {
        log.info("3");
        return next(e);
    }
};