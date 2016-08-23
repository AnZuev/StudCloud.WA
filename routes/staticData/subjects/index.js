'use strict';
const Router = require('koa-router');
const RDS = require("@anzuev/studcloud.rds");

// создаем новый роутер
let subRouter = new Router();

// добавляем префикс
subRouter.prefix("/subjects");

// обычная обработка запроса

/**
 * @swagger
 * /subjects/addSubject:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Add disabled subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         type: string
 *         required: true
 *         in: formData
 *         description: Title for new subject
 *     responses:
 *       200:
 *         description: data is correct, subject was created
 *         schema:
 *           $ref: "#/definitions/SubjectItem"
 *       400:
 *         description: creation failed
 */
subRouter.post('/addSubject', require("./handlers/addSubject"));


/**
 * @swagger
 * /subjects/activate:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Activate subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: string
 *         required: true
 *         in: formData
 *         description: Subject's id
 *     responses:
 *       200:
 *         description: Subject activated
 *
 *       400:
 *         description: some error, watch description
 */
subRouter.post('/activate', require("./handlers/activate"));

/**
 * @swagger
 * /subjects/deactivate:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Deactivate subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: string
 *         required: true
 *         in: formData
 *         description: Subject's id
 *     responses:
 *       200:
 *         description: Subject deactivated
 *
 *       400:
 *         description: some error, watch description
 */
subRouter.post('/deactivate', require("./handlers/deactivate"));

/**
 * @swagger
 * /subjects/changeName:
 *   post:
 *     tags:
 *       - Subjects
 *     description: Deactivate subject
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         type: string
 *         required: true
 *         in: formData
 *         description: Subject's id
 *       - name: newTitle
 *         type: string
 *         required: true
 *         in: formData
 *         description: new title for subject
 *     responses:
 *       200:
 *         description: Subject deactivated
 *
 *       400:
 *         description: some error, watch description
 */
subRouter.post('/changeName', require("./handlers/changeName"));

/**
 * @swagger
 * /subjects/getAll:
 *   get:
 *     tags:
 *       - Subjects
 *     description: Get all subjects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         type: string
 *         required: true
 *         in: formData
 *         description: string for search
 *       - name: skip
 *         type: string
 *         required: true
 *         in: formData
 *         description: how much pages it should skip from first element
 *     responses:
 *       200:
 *         description: Subjects were found
 *
 *       400:
 *         description: some error, watch description
 */
subRouter.get('/getAll', require("./handlers/getAllSubjects"));

/**
 * @swagger
 * /subjects/getEnabled:
 *   get:
 *     tags:
 *       - Subjects
 *     description: Get only enabled(activated) subjects
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         type: string
 *         required: true
 *         in: formData
 *         description: string for search
 *       - name: skip
 *         type: string
 *         required: true
 *         in: formData
 *         description: how much pages it should skip from first element
 *     responses:
 *       200:
 *         description: Subjects were found
 *
 *       400:
 *         description: some error, watch description
 */
subRouter.get('/getEnabled', require("./handlers/getEnabled"));




//экспорт роутера
module.exports = subRouter;