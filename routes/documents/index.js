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
 *     description: Нужен для добавления нового документа в базу знаний
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: document
 *         required: true
 *         in: body
 *         description: Объект документа
 *         schema:
 *           $ref: '#/definitions/documentItemRequest'
 *     responses:
 *       200:
 *         description: Все прошло хорошо, документ успешно добавлен
 *         schema:
 *           $ref: '#/definitions/documentItemResponse'
 *
 *       401:
 *         description: Пользователь не авторизован(code = 401)
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 *       405:
 *         description: Действие запрещено, но аккаунт еще не активирован(exception:true, code:405)
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.post('/addDocument', require("./handlers/addDocument"));
docRouter.post('/su', require("./handlers/setUser"));
docRouter.post('/addComment', require("./handlers/addComment"));
docRouter.post('/addLike', require("./handlers/addLike"));
docRouter.post('/addDislike', require("./handlers/addDislike"));
docRouter.post('/addWatch', require("./handlers/addWatch"));
docRouter.post('/addPart', require("./handlers/addPart"));
docRouter.post('/removePart', require("./handlers/removePart"));
docRouter.get('/getDocumentsBy', require("./handlers/getDocumentsBy"));
docRouter.get('/getDocumentById', require("./handlers/getDocumentById"));
docRouter.get('/getComments', require("./handlers/getComments"));


//экспорт роутера
module.exports = docRouter;