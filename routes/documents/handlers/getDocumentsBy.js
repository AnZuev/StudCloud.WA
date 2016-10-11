'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const UAMS = require('@anzuev/studcloud.uams');
const RDS = require('@anzuev/studcloud.rds');


module.exports = function*(){
    let title,page,context;
    try {
        title = this.request.query.title;
        page = this.request.query.page;
        context = this.request.query;
    }catch(e){
        throw new ValidationError(400, "Bad data");
    }
    let res = yield BI.getDocumentsBy(title,context,page);
    if (res.length == 0) throw 204;
    for(let i = 0; i < res.length; i++){
        res[i] = yield res[i].formatToSearch(UAMS, RDS.getWorkTypeModel(), this.user);
    }
    log.trace(res);
    this.body = res;
    this.status = 200;

};
