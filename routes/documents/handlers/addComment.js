'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');

const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
const DM = require('@anzuev/studcloud.datamodels').Document;


module.exports = function*(){
    try {
        log.trace(this.session.user);
        this.user = yield UAMS._Users.getUserById(this.session.user); // можно убрать, если не нужен ник
        let comment = {
            text: this.request.body.text,
            author: this.session.user
        };

        if(comment.text < 1) throw new ValidationError(400, "Too short text");

        let id = this.request.body.id;
        this.document = yield BI.getById(id);
        log.trace(this.document);
        yield BI.addComment(id,comment);
        yield this.document.saveDoc();
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
