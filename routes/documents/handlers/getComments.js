'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();

module.exports = function*(){
    try {
        let id = this.request.query.id;
        let date = this.request.query.date;
        let res = yield BI.getComments(id, date);
        if (res.length == 0) throw 204;
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
