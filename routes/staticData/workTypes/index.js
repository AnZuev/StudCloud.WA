'use strict';
const Router = require('koa-router');

let wtRouter = new Router();

wtRouter.prefix("/workTypes");

/*
 * TODO: здесь нужен только метод getEnabled и getById, все остальное я скопировал в админку
 */

/**
 * @swagger
 * /workTypes/addType:
 *   post:
 *     tags:
 *       - workTypes
 *     description: Add disabled workType
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Название типа работы
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, subject was created
 *         schema:
 *           $ref: "#/definitions/WorkTypeItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
wtRouter.post('/addType', require("./handlers/addType"));

/**
 * @swagger
 * /workTypes/activate:
 *   post:
 *     tags:
 *       - workTypes
 *     description: Activate workType
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: WorkType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *
 *       400:
 *         description: incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 *       404:
 *         description: no such workType
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
wtRouter.post('/activate', require("./handlers/activate"));

/**
 * @swagger
 * /workTypes/deactivate:
 *   post:
 *     tags:
 *       - workTypes
 *     description: Deactivate workType
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: WorkType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *
 *       400:
 *         description: incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 *       404:
 *         description: no such workType
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
wtRouter.post('/deactivate', require("./handlers/deactivate"));

/**
 * @swagger
 * /workTypes/setName:
 *   post:
 *     tags:
 *       - workTypes
 *     description: Change workType's name
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: WorkType's id
 *         type: string
 *         required: true
 *       - name: newTitle
 *         in: formData
 *         description: new title
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, subject was created
 *
 *       400:
 *         description: incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
wtRouter.post('/setName', require("./handlers/setName"));

/**
 * @swagger
 * /workTypes/isExist:
 *   post:
 *     tags:
 *       - workTypes
 *     description: Check if such workType exists
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: WorkType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *            $ref: '#/definitions/isWTExist'
 *       400:
 *         description: incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *       500:
 *         description: DB error
 *         schema:
 *            $ref: '#/definitions/Error'
 */
wtRouter.post('/isExist', require("./handlers/isExist"));

/**
 * @swagger
 * /workTypes/getAll:
 *   get:
 *     tags:
 *       - workTypes
 *     description: Get all workTypes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: formData
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: skip
 *         in: formData
 *         description: how much pages should skip
 *         type: number
 *         required: false
 *     responses:
 *       200:
 *         description: all information about workTypes
 *
 *       204:
 *         description: no such workTypes
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 */
wtRouter.get('/getAll', require("./handlers/getAll"));

/**
 * @swagger
 * /workTypes/getById:
 *   get:
 *     tags:
 *       - workTypes
 *     description: Get by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: workType's id
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: all information about workType
 *
 *       204:
 *         description: no such workType
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 *       400:
 *         description: Incorrect id
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 */
wtRouter.get('/getById', require("./handlers/getById"));

/**
 * @swagger
 * /workTypes/getEnabled:
 *   get:
 *     tags:
 *       - workTypes
 *     description: Get only enabled workTypes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: formData
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: skip
 *         in: formData
 *         description: how much pages should skip
 *         type: number
 *         required: false
 *     responses:
 *       200:
 *         description: all information about workTypes
 *
 *       204:
 *         description: no such workTypes
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 */
wtRouter.get('/getEnabled', require("./handlers/getEnabled"));

/**
 * @swagger
 * /workTypes/getDisabled:
 *   get:
 *     tags:
 *       - workTypes
 *     description: Get only disabled workTypes
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: formData
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: skip
 *         in: formData
 *         description: how much pages should skip
 *         type: number
 *         required: false
 *     responses:
 *       200:
 *         description: all information about workTypes
 *
 *       204:
 *         description: no such workTypes
 *         schema:
 *            $ref: '#/definitions/Error'
 *
 */
wtRouter.get('/getDisabled', require("./handlers/getDisabled"));

//экспорт роутера
module.exports = wtRouter;