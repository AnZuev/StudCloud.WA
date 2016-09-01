'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const UAMS = require('@anzuev/studcloud.uams');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;
// const File = require('@anzuev/studcloud.fileinterface');
// const FI = File.get();



module.exports = function*(){
    try {
        log.info(this.request.body);
        this.user = yield UAMS._Users.getUserById(this.session.user);
        log.info(this.user);
        let document = new BI;

        document.title = this.request.body.title;
        log.info(document);
        if (document.title.length < 1) throw new ValidationError(400, "Too short title");
        else {
            let condition1 = this.request.body.search.university && this.request.body.search.faculty && this.request.body.search.year;
            let condition2 = this.user.pubInform.university && this.user.pubInform.faculty && this.user.pubInform.year;
            log.trace(condition1 + " + " + condition2);
            if (condition1) {
                document.author = this.session.user;
                document.search.cType = this.request.body.search.type;
                document.search.subject = this.request.body.search.subject;
                document.search.universities = this.request.body.search.university;
                document.search.faculties = this.request.body.search.faculty;
                document.search.year = this.request.body.search.year;
            } else {
                if (condition2) {
                    document.author = this.session.user;
                    document.search.cType = this.request.body.search.type;
                    document.search.subject = this.request.body.search.subject;
                    document.search.universities = this.user.pubInform.university;
                    document.search.faculties = this.user.pubInform.faculty;
                    document.search.year = this.user.pubInform.year;
                } else throw new ValidationError(403);
            }
            log.info(document);
            if (this.request.body.parts && this.request.body.parts.length > 0) {
                for (let part of this.request.body.parts) {
                    document.addPart(part);
                    part.setFileUsed(true);
                }
            }
            let res = yield document.saveDoc();
            log.info(res);
            this.status = 200;
        }
    } catch (err) {
        if (err.code){
        log.info(err);
        throw err;
        }else{
            throw new ValidationError(400);
        }
    }
};
