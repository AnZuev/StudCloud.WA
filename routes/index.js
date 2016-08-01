'use strict';

var config = require('../config');
var host = config.get('general:host');
var log = require(appRoot + '/libs/log');

module.exports = function(router){

    // app.all('*', function(req, res, next) {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //     next();
    // });
    //
    // app.get('/oldPage', function(req, res, next){ //  /
    //     res.render('welcomePage', {
    //         host: host,
    //         publicStaticServer: publicStaticServer
    //     });
    //     next();
    // });
    //
    // app.get('/', function(req, res, next){
    //
    //     res.render('greetingsScreen', {
    //         host: host,
    //         publicStaticServer: publicStaticServer,
    //         templates: welcomePagetemplates
    //     });
    //     next();
    // });

    require('./authorize')(router);
    require('./documents')(router);

    // require('./general')(app);
    // // require('./calendar')(app);
    // require('./im')(app);
    // //require('./staticServer')(app);
    // require('./service')(app);
    // require('./staticData/universities')(app);
    // require('./staticData/subjects')(app);
    // require('./staticData/workTypes')(app);

};
