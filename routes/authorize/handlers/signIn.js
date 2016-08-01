'use strict';
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
// let rds = require('@anzuev/studcloud.rds');

function* a(next){
    // проверка что параметры переданы от юзера
    // ...

    try{
        let mail = this.request.body.mail;
        let password = this.request.body.password;
    }catch(e){
        log.error(e);
    }

    /*
     Поместили данные в this.authData
     */
    this.authData = {
        mail: this.request.body.mail,
        password: this.request.body.password
    };
    // this.authData.mail = this.request.body.mail;
    // this.authData.password = this.request.body.password;

    try{
        yield sso.signIn.call(this);
    }catch (err){
        if (err.code == 404) return log.info("err"); // TODO: обработка ошибок
        log.error(err);
        //что-то пошло не так, обрабатываем ошибку
    }













    try {
        let authData = {
            name: this.request.body.name,
            password: this.request.body.password,
            mail: this.request.body.mail
        };
        let user = yield sso.signIn(authData);
        log.info(user);
        return user;
    } catch (err) {
        log.info(err + "ERROR");
    }
}
module.exports = a;
