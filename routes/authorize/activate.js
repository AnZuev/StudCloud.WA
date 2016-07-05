'use strict';

let config = require(appRoot+'/config');

let sso = require('@anzuev/studcloud.sso');


Q.async(function*(req, res, next){
    var mail = req.query.mail || "";
    var key = req.query.key || "";
    


});