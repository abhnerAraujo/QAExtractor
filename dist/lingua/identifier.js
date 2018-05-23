"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eagle_1 = require("./../constants/eagle");
const rules_1 = require("./rules");
const lingua_1 = require("./lingua");
const question_classes_1 = require("./../constants/question-classes");
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
        console.log("starting identification...");
        console.log("working on " + this.sentences.length + " sentences");
        try {
            this.identify(question_classes_1.QUESTION_CLASSES.where);
            this.identify(question_classes_1.QUESTION_CLASSES.when);
            this.identify(question_classes_1.QUESTION_CLASSES.who);
            this.identify(question_classes_1.QUESTION_CLASSES.why);
            console.log("identifying complete.");
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    identify(type) {
        console.log("identifying question class: " + type);
        for (let sentence of this.sentences) {
            let _sentence = {
                text: sentence,
                class: ''
            };
            if (_sentence) {
                if (this.isValidSentenceForType(_sentence, type) && !this.exists(_sentence, type)) {
                    _sentence.class = type;
                    this.candidateSentences[type].push(_sentence);
                }
            }
        }
        console.log("Class '" + type + "' has " + this.candidateSentences[type].length + " sentence(s)");
    }
    hasDate(sentence) {
        try {
            let _lingua = new lingua_1.Lingua("pt");
            let result = [];
            result = _lingua.tagger(sentence.text);
            if (result && result.length > 0) {
                for (let tag of result) {
                    if (tag) {
                        let _tagged = this.createTaggedObject(sentence, tag);
                        if (_tagged.tags[0] == eagle_1.EAGLE.date.category.date) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        catch (err) {
            console.log(err);
        }
    }
    hasLocation(sentence) {
        try {
            let _lingua = new lingua_1.Lingua("pt");
            let result = [];
            result = _lingua.tagger(sentence.text);
            if (result && result.length > 0) {
                for (let tag of result) {
                    if (tag) {
                        let _tagged = this.createTaggedObject(sentence, tag);
                        if (_tagged.tags[4] == eagle_1.EAGLE.noun.neclass.location) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        catch (err) {
            console.log(err);
        }
    }
    isValidSentenceForType(sentence, type) {
        if (type == question_classes_1.QUESTION_CLASSES.when && this.hasDate(sentence)) {
            return true;
        }
        if (type == question_classes_1.QUESTION_CLASSES.where && this.hasLocation(sentence)) {
            return true;
        }
        for (let rule of rules_1.RULES[type]) {
            if (sentence.text.indexOf(rule) >= 0) {
                return true;
            }
        }
        return false;
    }
    exists(value, type) {
        for (let sentence of this.candidateSentences[type]) {
            if (sentence == value.text) {
                return true;
            }
        }
        return false;
    }
    createTaggedObject(sentence, termTagged) {
        let _termTagged = termTagged.split(" ");
        let _taggedObject = {
            sentence: sentence,
            term: _termTagged[0],
            primitiveForm: _termTagged[1],
            tags: _termTagged[2].split("")
        };
        return _taggedObject;
    }
}
exports.Identifier = Identifier;
