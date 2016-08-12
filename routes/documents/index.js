'use strict';
const Router = require('koa-router');
const SSO = require("@anzuev/studcloud.sso");

// создаем новый роутер
let docRouter = new Router();

// добавляем префикс
docRouter.prefix("/documents");

// обычная обработка запроса

/**
 * @swagger
 * /documents/addDocument:
 *   post:
 *     tags:
 *       - Documents
 *     description: Make user authorized if data is ok
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mail
 *         type: string
 *         required: true
 *         in: formData
 *         description: Mail for login
 *       - name: password
 *         type: string
 *         required: true
 *         in: formData
 *         description: password for login
 *     responses:
 *       200:
 *         description: data is correct, session binded with user
 *
 *       401:
 *         description: Authorization failed, incorrect mail or password
 */
docRouter.post('/addDocument', require("./handlers/addDocument"));




//экспорт роутера
module.exports = docRouter;