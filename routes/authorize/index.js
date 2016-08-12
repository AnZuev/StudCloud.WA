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
 *         description: Password for login
 *     responses:
 *       200:
 *         description: data is correct, session binded with user.
 *         schema:
 *           $ref: "#/definitions/signIn"
 *       401:
 *         description: Authorization failed, incorrect mail or password.
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
 *         schema:
 *           $ref: "#/definitions/UserInfo"
 *       400:
 *         description: Authorization failed, not enough data to signUp
 *         schema:
              $ref: '#/definitions/Error'
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
 *       200:
 *         description: data is correct, confirmation was sent
 *         schema:
 *           $ref: "#/definitions/confirmMail"
 *
 *       400:
 *         description: Authorization failed, not enough data to signUp
 *         schema:
 *           $ref: "#/definitions/confirmMail"
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
 *         schema:
 *           $ref: "#/definitions/signIn"
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
 *     description: Need to send letter, which contains special link with key for change password.
 *                  Для смены пароля необходимо сделать три запроса forgotPassword,
 *                  confirmPasswordToken, setNewPassword.
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
 *         description: All is correct, pass was changed and letter about this was sent.
 *         schema:
 *           $ref: "#/definitions/confirmMail"
 *
 *       400:
 *         description: Some type of error, likely user wasn't allowed to change pass.
 *         schema:
 *           $ref: "#/definitions/confirmMail"
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
 *       200:
 *         description: key is correct, user can change password(true if all is ok)
 *         schema:
 *           $ref: "#/definitions/confirmPasswordToken"
 *       400:
 *         description: key is not correct, user can not change password(false if it is some trouble)
 *         schema:
 *           $ref: "#/definitions/confirmPasswordToken"
 *       500:
 *         description: Some error
 */
authRouter.post("/confirmPasswordToken", require("./handlers/confirmPasswordToken"));


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     description: log out
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all is correct, session unpinned from user
 *       400:
 *         description: Some error
 */
authRouter.post('/logout', require('./handlers/logout.js'), SSO.logout);


//экспорт роутера
module.exports = authRouter;