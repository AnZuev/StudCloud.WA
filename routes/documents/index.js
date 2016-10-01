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

/**
 * @swagger
 * /documents/addComment:
 *   post:
 *     tags:
 *       - Documents
 *     description: Add comment to document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: text
 *         required: true
 *         in: body
 *         description: Text of comment
 *         type: string
 *       - name: id
 *         required: true
 *         in: body
 *         description: Document id
 *         type: string
 *     responses:
 *       200:
 *         description: Все прошло хорошо, комментарий успешно добавлен
 *         schema:
 *           $ref: "#/definitions/commentItem"
 *
 *       400:
 *         description: Слишком короткий комментарий
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.post('/addComment', require("./handlers/addComment"));

/**
 * @swagger
 * /documents/addLike:
 *   post:
 *     tags:
 *       - Documents
 *     description: Add like to document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: body
 *         description: Document id
 *         type: string
 *     responses:
 *       200:
 *         description: Все прошло хорошо, лайк успешно добавлен
 *         schema:
 *           $ref: "#/definitions/likeItem"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.post('/addLike', require("./handlers/addLike"));

/**
 * @swagger
 * /documents/addDislike:
 *   post:
 *     tags:
 *       - Documents
 *     description: Add dislike to document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: body
 *         description: Document id
 *         type: string
 *     responses:
 *       200:
 *         description: Все прошло хорошо, дизлайк успешно добавлен
 *         schema:
 *           $ref: "#/definitions/likeItem"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.post('/addDislike', require("./handlers/addDislike"));

/**
 * @swagger
 * /documents/addPart:
 *   post:
 *     tags:
 *       - Documents
 *     description: Add part to document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: body
 *         description: Document id
 *         type: string
 *       - name: url
 *         required: true
 *         in: body
 *         description: Part url
 *         type: string
 *     responses:
 *       200:
 *         description: Все прошло хорошо, часть успешно добавлена
 *         schema:
 *           $ref: "#/definitions/documentItemResponse"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.post('/addPart', require("./handlers/addPart"));

/**
 * @swagger
 * /documents/removePart:
 *   post:
 *     tags:
 *       - Documents
 *     description: Remove part from document
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: documentId
 *         required: true
 *         in: body
 *         description: Document id
 *         type: string
 *       - name: partId
 *         required: true
 *         in: body
 *         description: Part id
 *         type: string
 *     responses:
 *       200:
 *         description: Все прошло хорошо, часть удалена
 *         schema:
 *           $ref: "#/definitions/documentItemResponse"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.post('/removePart', require("./handlers/removePart"));

/**
 * @swagger
 * /documents/getDocumentsBy:
 *   get:
 *     tags:
 *       - Documents
 *     description: get documents by parameters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         required: true
 *         in: query
 *         description: Document title
 *         type: string
 *       - name: page
 *         required: true
 *         in: query
 *         description: сколько страниц пропустить
 *         type: integer
 *       - name: university
 *         in: query
 *         description: Универ, в рамках которого искать работу
 *         type: string
 *       - name: faculty
 *         in: query
 *         description: Факультет, в рамках которого искать работу
 *         type: string
 *       - name: year
 *         in: query
 *         description: Курс, в рамках которого искать работу
 *         type: integer
 *       - name: subject
 *         in: query
 *         description: Предмет, по которому ищется работа
 *         type: string
 *       - name: type
 *         in: query
 *         description: Тип работы
 *         type: string
 *     responses:
 *       200:
 *         description: Все найдено
 *         schema:
 *           $ref: "#/definitions/documentItemSuggest"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.get('/getDocumentsBy', require("./handlers/getDocumentsBy"));

/**
 * @swagger
 * /documents/getDocumentById:
 *   get:
 *     tags:
 *       - Documents
 *     description: get documents by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: query
 *         description: Document id
 *         type: string
 *     responses:
 *       200:
 *         description: Все найдено
 *         schema:
 *           $ref: "#/definitions/documentItemResponse"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.get('/getDocumentById', require("./handlers/getDocumentById"));

/**
 * @swagger
 * /documents/getComments:
 *   get:
 *     tags:
 *       - Documents
 *     description: get comments of document by it's id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         required: true
 *         in: query
 *         description: Document id
 *         type: string
 *       - name: date
 *         required: true
 *         in: query
 *         description: Date of last comment
 *         type: string
 *     responses:
 *       200:
 *         description: Все найдено
 *         schema:
 *           $ref: "#/definitions/commentItem"
 *
 *       500:
 *         description: Произошла внутренняя ошибка сервера
 *         schema:
 *           $ref: '#/definitions/Error'
 */
docRouter.get('/getComments', require("./handlers/getComments"));


//экспорт роутера
module.exports = docRouter;