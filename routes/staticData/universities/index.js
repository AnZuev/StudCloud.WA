'use strict';
const Router = require('koa-router');
let univerRouter = new Router();
univerRouter.prefix("/universities");

/*
 *  TODO: здесь нам нужны только запросы получения университетов или факультетов, все остальное я скопировал в админку
 */
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
 *         description: data is correct, university was created
 *         schema:
 *           $ref: "#/definitions/UniversityItem"
 *       400:
 *         description: creation failed
 *         schema:
 *            $ref: '#/definitions/Error'
 */
univerRouter.post('/addUniversity', require("./handlers/addUniversity"));

/**
 * @swagger
 * /universities/addFaculty:
 *   post:
 *     tags:
 *       - Universities
 *     description: Add faculty to university
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: formData
 *         description: University's id
 *         type: string
 *         required: true
 *       - name: title
 *         in: formData
 *         description: Faculty title
 *         type: string
 *         required: true
 *       - name: shortTitle
 *         in: formData
 *         description: Short title
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: data is correct, faculty was added to university
 *       400:
 *         description: creation failed, wrong data
 *         schema:
 *            $ref: '#/definitions/Error'
 */
univerRouter.post('/addFaculty', require("./handlers/addFaculty"));


/*
 * TODO: в случае 200 не совсем понятно что такое information info. Плюс это массив, а у тебя указано, что это объект
 */
/**
 * @swagger
 * /universities/getUniversities:
 *   get:
 *     tags:
 *       - Universities
 *     description: Get universities
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: formData
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: format
 *         in: formData
 *         description: if exists - full university's title, else - only short title. Doesn't influence on search string.
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Information array
 *         schema:
 *            $ref: '#/definitions/getUniversityInfo'
 *       204:
 *         description: No such items
 *         schema:
 *            $ref: '#/definitions/Error'
 */
univerRouter.get('/getUniversities', require("./handlers/getUniversities"));


/*
 * TODO: аналогично getUniversities
 */
/**
 * @swagger
 * /universities/getFaculties:
 *   get:
 *     tags:
 *       - Universities
 *     description: Get faculties
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: search
 *         in: formData
 *         description: string for search
 *         type: string
 *         required: false
 *       - name: format
 *         in: formData
 *         description: if exists - full faculty's title, else - only short title. Doesn't influence on search string.
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Information array
 *         schema:
 *            $ref: '#/definitions/getUniversityInfo'
 *       204:
 *         description: No such items
 *         schema:
 *            $ref: '#/definitions/Error'
 */
univerRouter.get('/getFaculties', require("./handlers/getFaculties"));

//экспорт роутера
module.exports = univerRouter;