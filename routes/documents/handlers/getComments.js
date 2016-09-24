'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();

module.exports = function*(){
	// TODO: Зачем try catch?
    try {
        let id = this.request.query.id;
	    // TODO: зачем забирать дату от юзера, если ее можно сделать на сервере new Date() ?
        let date = this.request.query.date;
        let res = yield BI.getComments(id, date);
        if (res.length == 0) throw 204; // TODO: зачем делать throw 204? можно просто this.body = res и если res это пустой массив то мы получил код 204
        this.body = res;
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
