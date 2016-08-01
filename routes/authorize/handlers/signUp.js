'use strict';
let mongoose = require('mongoose');
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');

function* a(){
    let authData;
    try {
        authData = {
            name: this.request.body.name.capitilizeFirstLetter(),
            surname: this.request.body.surname.capitilizeFirstLetter(),
            password: this.request.body.password,
            mail: this.request.body.mail
        };
    } catch (err) {
        log.info(err);
        // if (err.code == 400) next(400); //validation err
        // else if(err.code == 403) next(403); //auth error
        // else return next(err);
    }
    try{
        yield uams.createUser(authData);
    }catch(err){
        log.error(err);
    }
}
String.prototype.capitilizeFirstLetter = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = a;