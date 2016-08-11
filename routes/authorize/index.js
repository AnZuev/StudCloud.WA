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
authRouter.post('/signIn', /*подключение генератора для обработки*/require("./handlers/signIn"),SSO.signIn);


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

/**
 * @swagger
 * /auth/confirmMail:
 *   post:
 *     tags:
 *       - Auth
 *     description: Mail confirmation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mail
 *         type: string
 *         required: true
 *         in: formData
 *         description: User's mail
 *       - name: key
 *         type: string
 *         required: true
 *         in: formData
 *         description: key, which was sent to user's mail
 *     responses:
 *       "result: ok":
 *         description: all is ok, user is confirmed by mail
 *
 *       "result: failed":
 *         description: user wasn't confirmed by mail
 *       200:
 *         description: data is correct, confirmation was sent
 *
 *       400:
 *         description: Authorization failed, not enough data to signUp
 *
 *       404:
 *         description: There is no user with such mail
 */
authRouter.post("/confirmMail", require("./handlers/confirmMail"));

/**
 * @swagger
 * /auth/resendActivation:
 *   post:
 *     tags:
 *       - Auth
 *     description: Resend activation key to user's mail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mail
 *         type: string
 *         required: true
 *         in: formData
 *         description: User's mail
 *     responses:
 *       200:
 *         description: data is correct, session binded with user
 *
 *       404:
 *         description: There is no user with such mail
 *
 *       500:
 *         description: Server error
 */
authRouter.post("/resendActivation", require("./handlers/resendActivation"));

/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     tags:
 *       - Auth
 *     description: Need to send letter, which contains special link with key for change password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mail
 *         type: string
 *         required: true
 *         in: formData
 *         description: User's mail
 *     responses:
 *       200:
 *         description: All is correct, letter was sent to user
 *
 *       400:
 *         description: Not enough data to process
 */
authRouter.post("/forgotPassword", require("./handlers/forgotPassword"));

/**
 * @swagger
 * /auth/setNewPassword:
 *   post:
 *     tags:
 *       - Auth
 *     description: Check, if user was allowed to change pass and do it
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         type: string
 *         required: true
 *         in: formData
 *         description: new password for user's account
 *     responses:
 *       200:
 *         description: All is correct, pass was changed and letter about this was sent
 *
 *       400:
 *         description: Some type of error, likely user wasn't allowed to change pass
 */
authRouter.post("/setNewPassword", require("./handlers/setNewPassword"));


/**
 * @swagger
 * /auth/confirmPasswordToken:
 *   post:
 *     tags:
 *       - Auth
 *     description: Check key, which was sent to user's mail
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: mail
 *         type: string
 *         required: true
 *         in: formData
 *         description: User's mail
 *       - name: key
 *         type: string
 *         required: true
 *         in: formData
 *         description: key from letter
 *     responses:
 *
 *       "true, 200":
 *         description: key is correct, user can change password
 *
 *       "false, 400":
 *         description: key is not correct, user can not change password
 *
 *       400:
 *         description: Some error
 */
authRouter.post("/confirmPasswordToken", require("./handlers/confirmPasswordToken"));


/**
 * @swagger
 * /auth/signIn:
 *   post:
 *     tags:
 *       - Auth
 *     description: Make user authorized if data is ok
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all is correct, session unpinned from user
 *
 *       400:
 *         description: Some error
 */
authRouter.post('/logout', require('./handlers/logout.js'), SSO.logout);


//экспорт роутера
module.exports = authRouter;