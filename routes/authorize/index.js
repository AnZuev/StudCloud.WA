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


/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     tags:
 *       - Auth
 *     description: User registration
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
 *         description: Password for login
 *       - name: name
 *         type: string
 *         required: true
 *         in: formData
 *         description: Name for login
 *       - name: surname
 *         type: string
 *         required: true
 *         in: formData
 *         description: Surname for login
 *     responses:
 *       200:
 *         description: data is correct, confirmation was sent
 *
 *       400:
 *         description: Authorization failed, not enough data to signUp
 */
authRouter.post("/signUp", require("./handlers/signUp"));


authRouter.post("/confirmMail", require("./handlers/confirmMail"));

authRouter.post("/resendActivation", require("./handlers/resendActivation"));

authRouter.post("/forgotPassword", require("./handlers/forgotPassword"));
authRouter.post("/setNewPassword", require("./handlers/setNewPassword"));
authRouter.post("/confirmPasswordToken", require("./handlers/confirmPasswordToken"));

authRouter.post('/logout', require('./handlers/logout.js'), SSO.logout);


//экспорт роутера
module.exports = authRouter;