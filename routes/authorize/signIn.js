'use strict';

let Q = require('q');

let config = require('.../config');

let sso = require('@anzuev/studcloud.sso');
sso.init();

Q.async(function*(req, res, next){
    var password, mail;
    try{
        password = req.body.password || "";
        mail = req.body.mail || "";
    }catch(e){
        throw e;
    }
    if(password.length == 0 || mail.length == 0) next(401);

    try {
        let user = yield sso.signIn(mail, password);

    }catch(err){
        //обработка ошибок
    }
    
    
    User.signIn(mail, password, function(err, user){
        if(err) {
            if((err instanceof authError) && (err.code == 110001)){
                var httperr = new httpError(405, "Почта не подтверждена. Пожалуйста, подтвердите свою почту");
                return next(httperr)
            }else if(err instanceof authError) {
                next(401)
            }else{
                log.error(err);
                return next(err);
            }
        }else{
            req.session.user = user._id;
            async.parallel([
                function(callback){
                    UI.getFacultyName(user.pubInform.university, user.pubInform.faculty, callback);
                },
                function(callback){
                    UI.getUniversityName(user.pubInform.university, callback);
                }
            ], function(err, result){
                var userToReturn;
                if(err){
                    userToReturn = {
                        name: user.pubInform.name,
                        surname: user.pubInform.surname,
                        photo:user.pubInform.photo,
                        year: user.pubInform.year,
                        group: user.pubInform.group,
                        id: user._id
                    };
                    res.json(userToReturn);
                    res.end();
                }
                else{
                    userToReturn = {
                        name: user.pubInform.name,
                        surname: user.pubInform.surname,
                        photo:user.pubInform.photo,
                        year: user.pubInform.year,
                        faculty: result[0].title,
                        university: result[1].title,
                        group: user.pubInform.group,
                        id: user._id
                    };
                    res.json(userToReturn);
                    res.end();
                }
                return next();
            });
        }
    });



});