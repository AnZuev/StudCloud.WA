'use strict';
const Router = require('koa-router');
const swaggerJSDoc = require('swagger-jsdoc');


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
swaggerSpec.definitions.user = 

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
 */
swaggerRouter.get('/api.json', function*(next){
	this.body = swaggerSpec;
	yield next;
});

module.exports = swaggerRouter;