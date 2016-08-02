'use strict';
let log = require(appRoot + '/libs/log');


module.exports = function*(next){
	yield next;
	this.body = 'ok';
	// еще что-то делаем если надо
};
