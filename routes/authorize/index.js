'use strict';
const Router = require('koa-router');
const SSO = require("@anzuev/studcloud.sso");

let authRouter = new Router();

authRouter.prefix("/auth");

authRouter.post('/signIn', require("./handlers/signIn"), SSO.signIn);

authRouter.post("/signUp", require("./handlers/signUp"));

authRouter.post('/logout', require('./handlers/logout.js'), SSO.logout);


module.exports = authRouter;

