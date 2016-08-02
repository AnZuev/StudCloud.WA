'use strict';
let log = require(appRoot + '/libs/log');
const SSO = require('@anzuev/studcloud.sso');
const UAMS = require('@anzuev/studcloud.uams');

const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(next){
    // проверка что параметры переданы от юзера
    // ...

    try{
        let data = {
            mail: this.request.body.mail,
            key: this.request.body.key
            };
        this.user = yield* UAMS._Users.getUserByMail(data.mail);

        // if(!data.mail || !data.password){
        //     // что-то не передано
        //     // кидаем ошибку
        //     let error = new ValidationError(400, "Not enough data to proccess signIn");
        //     log.error(error);
        //     throw error;
        // }

        // yield UAMS.User.confirmMail(data);

        yield this.user.confirmMail(data.key);

        this.body = this.session;
        // делаем еще что-то
    }catch(e){
        log.error(e);
        throw e;
    }
};
// module.exports = preLogin;
