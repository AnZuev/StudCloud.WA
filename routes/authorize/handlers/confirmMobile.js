'use strict';
let log = require(appRoot + '/libs/log');
const SSO = require('@anzuev/studcloud.sso');
const UAMS = require('@anzuev/studcloud.uams');
const NOTIFY = require('@anzuev/notify');

const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(next){
    // проверка что параметры переданы от юзера
    // ...

    try{
        let data = {
            mail: this.request.body.mail,
            key: this.request.body.key
        };
        log.info(data); // koa status response
        if(data.mail==undefined || !data.key){
            // что-то не передано
            // кидаем ошибку
            let error = new ValidationError(400, "Not enough data to process");
            log.error(error);
            this.body = {result: "failed"};
            throw error;
        }
        this.user = yield UAMS._Users.getUserByMail(data.mail);


        this.user.confirmMobile(data.key);
        yield this.user.saveUser();
        this.body = {result: "ok"};
        // делаем еще что-то
    }catch(e){
        log.error(e);
        throw e;
    }
};
// module.exports = preLogin;
