'use strict';
let mongoose = require('mongoose');
let sso = require('@anzuev/studcloud.sso');
let log = require(appRoot + '/libs/log');
let uams = require('@anzuev/studcloud.uams');
let rds = require('@anzuev/studcloud.rds');
let University = require('@anzuev/studcloud.rds').getUniversityModel();

function* a(){
    try {
        let authData = {
            name: this.request.body.name.capitilizeFirstLetter(),
            surname: this.request.body.surname.capitilizeFirstLetter(),
            password: this.request.body.password,
            mail: this.request.body.mail
        };
        // let year = this.request.body.year;
        // let faculty = mongoose.Types.ObjectId(this.request.body.faculty);
        // let group = this.request.body.group || "";
        // let university = mongoose.Types.ObjectId(this.request.body.university);
        // let studNumber = this.request.body.studNumber;

        let user = yield sso.signUp(authData);
        log.info(user);
        // let b = University.isExist(university,faculty); // find university
        // log.info(b);

        // log.info("before a");
        // let a = yield first(1);
        // log.info("after a");
        // log.info("before b");
        //
        // let b =  second(2);
        // log.info("before b");
        return user;

        // yield this.user.confirmMail(mail,key);
        // uams.getUsersByMailConfirmation();
        // return "";
    } catch (err) {
        log.info(err + "ERROR");
        // if (err.code == 400) next(400); //validation err
        // else if(err.code == 403) next(403); //auth error
        // else return next(err);
    }
}
String.prototype.capitilizeFirstLetter = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = a;