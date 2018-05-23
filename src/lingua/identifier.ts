import { ICandidatesObject } from './../interfaces/candidates-object';
import { EAGLE } from './../constants/eagle';
import { ITagged } from './../interfaces/tagged.interface';
import { RULES } from './rules';
import { ISentence } from '../interfaces/sentence.interface';
import { Lingua } from './lingua';
import { QUESTION_CLASSES as question } from './../constants/question-classes';
export class Identifier {
    
    private candidateSentences:ICandidatesObject = {
        where:[],
        why:[],
        what:[],
        who:[],
        when:[],
    };
    private sentences: Array<string>;

    constructor(values:Array<string>){
        this.sentences = values;
    }

    getCandidates():ICandidatesObject{
        return this.candidateSentences;
    }

    public startIdentifying():boolean{
        console.log("starting identification...")
        console.log("working on " + this.sentences.length + " sentences");
        try{
            // this.identify('what');
            this.identify(question.where);
            this.identify(question.when);
            this.identify(question.who);
            this.identify(question.why);
            console.log("identifying complete.");
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
    }

    private identify(type:string){
        console.log("identifying question class: " + type)
        for(let sentence of this.sentences){
            let _sentence: ISentence = {
                text: sentence,
                class: ''
            };
            if(_sentence) {
                if(this.isValidSentenceForType(_sentence, type) && !this.exists(_sentence, type)){
                    _sentence.class = type;
                    this.candidateSentences[type].push(_sentence)
                }
            }
        }
        console.log("Class '"+ type + "' has " + this.candidateSentences[type].length + " sentence(s)");
    }

    private hasDate(sentence:ISentence):boolean{
        try{
            let _lingua = new Lingua("pt");
            let result = [];
            result = _lingua.tagger(sentence.text);
            if(result && result.length > 0){
                for(let tag of result){
                    if(tag){
                        let _tagged = this.createTaggedObject(sentence, tag)
                        if(_tagged.tags[0] == EAGLE.date.category.date) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }catch(err){
            console.log(err);
        }
    }

    private hasLocation(sentence:ISentence):boolean{
        try{
            let _lingua = new Lingua("pt");
            let result = [];
            result = _lingua.tagger(sentence.text);
            if(result && result.length > 0){
                for(let tag of result){
                    if(tag){
                        let _tagged = this.createTaggedObject(sentence, tag)
                        if(_tagged.tags[4] == EAGLE.noun.neclass.location) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }catch(err){
            console.log(err);
        }
    }

    private isValidSentenceForType(sentence:ISentence, type:string):boolean{
        if(type == question.when && this.hasDate(sentence)){
            return true;
        }
        if(type == question.where && this.hasLocation(sentence)){
            return true;
        }
        for(let rule of RULES[type]){
            if(sentence.text.indexOf(rule) >= 0){
                return true;
            }    
        }
        return false
    }

    private exists(value:ISentence, type:string){
        for(let sentence of this.candidateSentences[type]){
            if(sentence == value.text){
                return true;
            }
        }
        return false;
    }

    private createTaggedObject(sentence:ISentence, termTagged:string):ITagged{
        let _termTagged = termTagged.split(" ");
        let _taggedObject: ITagged = {
            sentence:sentence,
            term:_termTagged[0],
            primitiveForm:_termTagged[1],
            tags: _termTagged[2].split("")
        }

        return _taggedObject;

    }

}