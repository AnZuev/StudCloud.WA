'use strict';


module.exports = function(app){

	//app.use(require("./general").routes());
	app.use(require("./authorize").routes());
};