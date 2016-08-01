'use strict';
let sso = require('@anzuev/studcloud.sso');
var log = require(appRoot + '/libs/log');


module.exports = function(router){
    // router.post('/auth/signUp', function* (next) {
    //     let f = require('./handlers/signUp');
    //     let a = yield f;
    //     // let a = {
    //     //     1: this.request.body.mail,
    //     //     2: this.request.body.key};
    //     log.info(a);
    //     this.body = a;
    // });
    router.post('/auth/signUp', require('./handlers/signUp'));
    router.post('/auth/signIn', require('./handlers/signIn'));


    // router.post('/auth/signInCorrect', function*(next){
    //     // проверка что параметры переданы от юзера
    //     // ...
    //
    //     /*
    //      Поместили данные в this.authData
    //      */
    //     this.authData = {};
    //     this.authData.mail = this.request.body.mail;
    //     this.authData.password = this.request.body.password;
    //
    //     try{
    //         yield next;
    //     }catch (err){
    //         //что-то пошло не так, обрабатываем ошибку
    //     }
    // }, sso.signIn);

    router.post('/auth/logOut', function* (next){
        let f = require('./handlers/logOut');
        let a = yield f;
        log.info(a);
        this.body = a;
    });
    router.post('/auth/confirmMail', function* (next){
        let f = require('./handlers/confirmMail');
        let a = yield f;
        log.info(a);
        this.body = a;
    });

};