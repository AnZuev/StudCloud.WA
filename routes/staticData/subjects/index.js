'use strict';
const Router = require('koa-router');
const RDS = require("@anzuev/studcloud.rds");

// создаем новый роутер
let subRouter = new Router();

// добавляем префикс
subRouter.prefix("/subjects");

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
 *         required: false
 *         in: formData
 *         description: string for search
 *       - name: skip
 *         type: string
 *         required: false
 *         in: formData
 *         description: how much pages it should skip from first element
 *     responses:
 *       200:
 *         description: Subjects were found
 *         schema:
 *           $ref: '#/definitions/SubjectItem'
 *
 *       204:
 *         description: There is no such subjects
 *
 *       400:
 *         description: some error, watch description
 *         schema:
 *            $ref: '#/definitions/Error'
 */
subRouter.get('/getEnabled', require("./handlers/getEnabled"));




//экспорт роутера
module.exports = subRouter;