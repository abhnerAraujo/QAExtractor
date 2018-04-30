"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rules_1 = require("./rules");
class Identifier {
    constructor(values) {
        this.candidateSentences = {
            where: [],
            why: [],
            what: [],
            who: [],
            when: [],
        };
        this.sentences = values;
    }
    getCandidates() {
        return this.candidateSentences;
    }
    startIdentifying() {
        this.identify('what');
        this.identify('where');
        this.identify('when');
        this.identify('who');
        this.identify('why');
    }
    identify(type) {
        for (let sentence of this.sentences) {
            if (sentence && this.isValidSentenceForType(sentence, type)) {
                this.candidateSentences[type].push(sentence);
            }
        }
    }
    isValidSentenceForType(sentence, type) {
        for (let rule of rules_1.RULES[type]) {
            if (sentence.indexOf(rule) >= 0) {
                console.log(rule);
                return true;
            }
        }
        return false;
    }
    exists(type, value) {
        for (let sentence of this.candidateSentences[type]) {
            if (sentence == value) {
                return true;
            }
        }
        return false;
    }
}
exports.Identifier = Identifier;
