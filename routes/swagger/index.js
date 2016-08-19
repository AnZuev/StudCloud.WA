'use strict';
const Router = require('koa-router');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('mz/fs');
const path = require('path');


// создаем новый роутер
let swaggerRouter = new Router();


var options = {
	swaggerDefinition: {
		info: {
			title: 'StudCloud - webApi',
			version: '1.0.0',
			description: "WebApi description for StudCloud project"
		},
		host: require(appRoot + "config").get('bin:host') + ":" + require(appRoot + "config").get('bin:port'),
		basePath: '/'
	},
	apis: [appRoot + 'routes/**/*.js']

};

let swaggerSpec = swaggerJSDoc(options);
swaggerSpec.definitions.Error = require('./jsonDefinitions/Error.json');
swaggerSpec.definitions.confirmPasswordToken = require('./jsonDefinitions/confirmPasswordToken.json');
swaggerSpec.definitions.UserInfo = require('./jsonDefinitions/UserInfo.json');
swaggerSpec.definitions.confirmMail = require('./jsonDefinitions/confirmMail.json');
swaggerSpec.definitions.signIn = require('./jsonDefinitions/signIn.json');
swaggerSpec.definitions.SubjectItem = require('./jsonDefinitions/SubjectItem.json');
swaggerSpec.definitions.UniversityItem = require('./jsonDefinitions/UniversityItem.json');
swaggerSpec.definitions.WorkTypeItem = require('./jsonDefinitions/WorkTypeItem.json');
swaggerSpec.definitions.isWTExist = require('./jsonDefinitions/isWTExist.json');
swaggerSpec.definitions.getUniversityInfo = require('./jsonDefinitions/getUniversityInfo.json');

/**
 * @swagger
 * /api.json:
 *   get:
 *     tags:
 *       - Swagger
 *     description: Returns api.json file
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Api.json file
 *       404:
 *         description: file not found
 *         schema:
 *           $ref: "#/definitions/Error"
 */
swaggerRouter.get('/api.json', function*(next){
	this.body = swaggerSpec;
	yield next;
});

swaggerRouter.get('/swagger', function*(next){
	this.body = yield fs.readFile(path.resolve('views/swagger.html'));
	this.set('Content-Type', 'text/html');
	yield next;
});

module.exports = swaggerRouter;