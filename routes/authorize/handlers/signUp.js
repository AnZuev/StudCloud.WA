'use strict';
let log = require(appRoot + '/libs/log');
const UAMS = require('@anzuev/studcloud.uams');
const Notify = require('@anzuev/notify');
const mailBoxes = require(appRoot + '/config/mailBoxes');
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const AuthError = require("@anzuev/studcloud.errors").AuthError;



function* preSignUp(){
    let name,surname,mail,password;
    try {
        name = this.request.body.name;
        surname = this.request.body.surname;
        mail = this.request.body.mail;
        password = this.request.body.password;
    }catch (e){
        throw new ValidationError(400, "Not enough data");
    }

    if(name * surname * mail * password == 0){
        throw new ValidationError(400, "Not enough data to process");
    }

    try{
        let authData = {
            name: name.capitilizeFirstLetter(),
            surname: surname.capitilizeFirstLetter(),
            password: password,
            mail: mail
        };


        let user = yield UAMS.createUser(authData);
        this.body = {
            id: user._id,
            name: authData.name,
            surname: authData.surname,
            mail: authData.mail

            // key: user.authActions.mailSubmit.key
        };

        //TODO: ссылку нормальную сюда надо передавать

        //TODO: письмо не отправляется - ?!
        let not = new (Notify.getMailConfirmNotification())("http://istudentapp.ru/link/to/confirm");
        yield not.sendToOne(user.auth.mail);
    }catch(err){
        // TODO: может быть ошибка типа AuthError
        if(err instanceof AuthError) throw new AuthError(401);
        throw err;
    }

}

String.prototype.capitilizeFirstLetter = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

module.exports = preSignUp;