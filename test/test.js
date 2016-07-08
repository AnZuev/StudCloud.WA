'use strict';
let sso = require('@anzuev/studcloud.sso');
var log = require(appRoot + '/libs/log');
let authData = {
    name: "Ant",
    password: "sdkmskdmsf",
    surname: "Zuev",
    mail: "paul.osmolovsky@gmail.com"
};
function* answer(){

    try {
        // yield sso.signUp(authData);
        // return "log";


        // let user = yield sso.signUp(authData);
        let user = yield sso.signIn(authData);

        let res = yield sso.checkPermissionToGetFile(user, '575eb3749ded7fef0bdbf08c');
        //let res = yield sso.setPasswordKey(authData.mail);
        //let res = yield sso.setPassword(authData.mail, authData.password, '');
        //let user = yield sso.confirmMail(authData.mail, '03df24bcce1e45b231876fe5b2c405b0a4940ebc');
        log.trace(user  +   "    "  +  res);
        return "end";

    } catch (err) {
        log.info(err + "ERROR");
        throw err;
    }

    // let a = sso.signUp();
    // yield a;
}
let generator = answer();
let k = {
    1:generator.next(),
    2:generator.next(),
    6:generator.next()
};

module.exports = k; 