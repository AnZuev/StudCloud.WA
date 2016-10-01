'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(){
    let comment;
    try {
        comment = {
            text: this.request.body.text,
            author: this.session.user
        };
    }catch (e) {
        throw new ValidationError(400, "Not enough data");
    }
    try{
        let id = this.request.body.id;
        if(comment.text < 1) throw new ValidationError(400, "Too short text");
        yield BI.addComment(id,comment);
        this.document = yield BI.getById(id);
        yield this.document.saveDoc();
        this.body = {
            author:{
                name: this.user.pubInform.name,
                surname: this.user.pubInform.surname,
                id: this.user._id
            },
            text: comment.text,
            id: this.document.social.comments[this.document.social.comments.length - 1]._id,
            created: this.document.social.comments[this.document.social.comments.length - 1].created
        };
        this.status = 200;
    }catch (err) {
        log.info(err);
        throw err;
    }
};
