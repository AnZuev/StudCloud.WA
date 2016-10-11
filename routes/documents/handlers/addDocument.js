'use strict';
const log = require(appRoot + '/libs/log');
const BZ = require('@anzuev/knowbase');
const BI = BZ.getModel();
const ValidationError = require("@anzuev/studcloud.errors").ValidationError;

module.exports = function*(){
    let document;
    try {
        document = new BI;
        document.title = this.request.body.title;
    }catch (e) {
        throw new ValidationError(400, "Not enough data");
    }

    if (document.title.length < 1) throw new ValidationError(400, "Too short title");
    else {
        // далее идут проверки на наличие данных, если один из аргументов неопределен, или вовсе отсутствует то выражение равняется 0
        // сначала смотрим на данные в запросе, если юзер хочет "перекрыть" свои данные, для добавления док-а не своего уника
        let condition1 = this.request.body.search.university && this.request.body.search.faculty && this.request.body.search.year;
        //тут смотрим на данные в профиле юзера, выполнится, если в запросе не указана инфа
        let condition2 = this.user.pubInform.university && this.user.pubInform.faculty && this.user.pubInform.year;
        // log.trace(condition1 + " + " + condition2);
        if (condition1) {
            document.author = this.session.user;
            document.description = this.request.body.description;
            document.search.cType = this.request.body.search.type;
            document.search.subject = this.request.body.search.subject;
            document.search.universities = this.request.body.search.university;
            document.search.faculties = this.request.body.search.faculty;
            document.search.year = this.request.body.search.year;
        } else {
            if (condition2) {
                document.author = this.session.user;
                document.description = this.request.body.description;
                document.search.cType = this.request.body.search.type;
                document.search.subject = this.request.body.search.subject;
                document.search.universities = this.user.pubInform.university;
                document.search.faculties = this.user.pubInform.faculty;
                document.search.year = this.user.pubInform.year;
            } else throw new ValidationError(403);
        }
        if (this.request.body.parts && this.request.body.parts.length > 0) {
            for (let part of this.request.body.parts) {
                document.addPart(part);
                part.setFileUsed(true);
            }
        }
        yield document.saveDoc();
        this.status = 200;
    }
};
