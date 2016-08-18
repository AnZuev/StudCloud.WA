'use strict';
const Router = require('koa-router');

// создаем новый роутер
let univerRouter = new Router();

// добавляем префикс
univerRouter.prefix("/universities");

// обычная обработка запроса

/**
 * @swagger
 * /universities/addUniversity:
 *   post:
 *     tags:
 *       - Universities
 *     description: Add enabled university
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         description: Название университета, по которому его можно будет найти
 *         type: string
 *         required: true
 *       - name: shortTitle
 *         in: formData
 *         description: Краткое название
 *         type: string
 *         required: true
 *       - name: city
 *         in: formData
 *         description: Город, в котором расположен универ
 *         type: string
 *         required: true
 *       - name: street
 *         in: formData
 *         description: Улица, на которой расположен универ
 *         type: string
 *         required: true
 *       - name: building
 *         in: formData
 *         description: Номер дома
 *         type: string
 *         required: true
 *       - name: rating
 *         in: formData
 *         description: Рейтинг универа(все универы при поиске сортируются по рейтингу)
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, subject was created
 *         schema:
 *           $ref: "#/definitions/UniversityItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
univerRouter.post('/addUniversity', require("./handlers/addUniversity"));
univerRouter.post('/addFaculty', require("./handlers/addFaculty"));
univerRouter.get('/getUniversities', require("./handlers/getUniversities"));
univerRouter.get('/getFaculties', require("./handlers/getFaculties"));

//
// /**
//  * @swagger
//  * /subjects/activate:
//  *   post:
//  *     tags:
//  *       - Subjects
//  *     description: Activate subject
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: id
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: Subject's id
//  *     responses:
//  *       200:
//  *         description: Subject activated
//  *
//  *       400:
//  *         description: some error, watch description
//  */
// subRouter.post('/activate', require("./handlers/activate"));
//
// /**
//  * @swagger
//  * /subjects/deactivate:
//  *   post:
//  *     tags:
//  *       - Subjects
//  *     description: Deactivate subject
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: id
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: Subject's id
//  *     responses:
//  *       200:
//  *         description: Subject deactivated
//  *
//  *       400:
//  *         description: some error, watch description
//  */
// subRouter.post('/deactivate', require("./handlers/deactivate"));
//
// /**
//  * @swagger
//  * /subjects/changeName:
//  *   post:
//  *     tags:
//  *       - Subjects
//  *     description: Deactivate subject
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: id
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: Subject's id
//  *       - name: newTitle
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: new title for subject
//  *     responses:
//  *       200:
//  *         description: Subject deactivated
//  *
//  *       400:
//  *         description: some error, watch description
//  */
// univerRouter.post('/changeName', require("./handlers/changeName"));
//
// /**
//  * @swagger
//  * /subjects/getAll:
//  *   get:
//  *     tags:
//  *       - Subjects
//  *     description: Get all subjects
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: search
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: string for search
//  *       - name: skip
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: how much pages it should skip from first element
//  *     responses:
//  *       200:
//  *         description: Subjects were found
//  *
//  *       400:
//  *         description: some error, watch description
//  */
// univerRouter.get('/getAll', require("./handlers/getAllSubjects"));
//
// /**
//  * @swagger
//  * /subjects/getEnabled:
//  *   get:
//  *     tags:
//  *       - Subjects
//  *     description: Get only enabled(activated) subjects
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: search
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: string for search
//  *       - name: skip
//  *         type: string
//  *         required: true
//  *         in: formData
//  *         description: how much pages it should skip from first element
//  *     responses:
//  *       200:
//  *         description: Subjects were found
//  *
//  *       400:
//  *         description: some error, watch description
//  */
// univerRouter.get('/getEnabled', require("./handlers/getEnabled"));
//
//


//экспорт роутера
module.exports = univerRouter;