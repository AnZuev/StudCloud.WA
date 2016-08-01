'use strict';
const Router = require('koa-router');
const SSO = require("@anzuev/studcloud.sso");

// создаем новый роутер
let authRouter = new Router();

// добавляем прификс
// то есть теперь при autoRouter.get('/url') будет обрабатываться запрос /auth/url
authRouter.prefix("/auth");

// обычная обработка запроса

/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     tags:
 *       - Auth
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
authRouter.post('/signIn', /*подключение генератора для обработки*/require("./handlers/signIn"), SSO.signIn);

authRouter.post("/signUp", require("./handlers/signUp"));

authRouter.post('/logout', require('./handlers/logout.js'), SSO.logout);


//экспорт роутера
module.exports = authRouter;