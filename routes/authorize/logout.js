'use strict';

let Q = require('q');

Q.async(function*(req, res){

    if(res.req.headers['x-requested-with'] == 'XMLHttpRequest'){
        req.session.user = null;
        res.end();
    }

});