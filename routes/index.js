'use strict';

/*
	при подключении этого файла навешиваются все обработчики запросов
	app.use(Router router.routes()); - подключение конкретного роутера
 */
module.exports = function(app){

	//app.use(require("./general").routes());
	app.use(require("./authorize").routes());
	app.use(require("./documents").routes());
	app.use(require("./staticData/subjects").routes());
	app.use(require("./staticData/universities").routes());
	app.use(require("./staticData/workTypes").routes());
	app.use(require("./swagger").routes());

};