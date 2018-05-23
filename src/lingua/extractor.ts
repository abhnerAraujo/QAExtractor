import { ITaggedsObject } from './../interfaces/taggeds-object';
import { OPERATIONS } from './../utils/array.operations';
import { ICandidatesObject } from './../interfaces/candidates-object';
import { Lingua } from './lingua';
import { IQASentence } from './../interfaces/qa-sentence.interface';
import { QUESTION_CLASSES as question } from './../constants/question-classes';
import { ITagged } from './../interfaces/tagged.interface';
import { FILTER_RULES, MUST_CAPITALIZE } from './rules';
import { ISentence } from './../interfaces/sentence.interface';
import { EAGLE as eagle } from './../constants/eagle';
export class Extractor {
    
    private candidates: ICandidatesObject;
    private taggedSentences: ITaggedsObject = {
        where:[],
        why:[],
        what:[],
        who:[],
        when:[],
    };

    private extractedSentences:IQASentence[] = [];

    constructor(candidates: ICandidatesObject){
        this.candidates = candidates;
    }

    private tagSentences(type:string){
        let lingua = new Lingua("pt");
        for(let sentence of this.candidates[type]){
            let result = lingua.tagger(sentence.text)
            result = OPERATIONS.clearEmpty(result);
            if(result && result.length > 0){
                let taggedSentence:ITagged[] = []
                for(let tagged of result){
                    tagged = tagged.trim();
                    taggedSentence.push(this.createTaggedObject(sentence, tagged))
                }
                this.taggedSentences[type].push(taggedSentence);
            }
        }
    }

    public startExtracting(){
        this.tagSentences(question.where);
        // this.tagSentences(question.who);
        this.tagSentences(question.when);
        // this.tagSentences(question.why);
        this.extractedSentences = this.extractedSentences.concat(this.extractWhereQuestion(this.taggedSentences.where));
        this.extractedSentences = this.extractedSentences.concat(this.extractWhenQuestion(this.taggedSentences.when));
    }

    public getExtractedQuestions(){
        return this.extractedSentences;
    }

    private extractWhenQuestion(sentencesTagged:Array<ITagged[]>):IQASentence[]{
        let _qaSentences: Array<IQASentence> = [];
        for(let sentence of sentencesTagged){
            let _qaSentence: IQASentence = {question: "", answer: [""], sentence: sentence[0].sentence}
            let dateIndex:number = this.findDateIndex(sentence);

            if(dateIndex > 0) {
                if(this.isAdposition(sentence[dateIndex - 1])){
                    let adpositionIndex = dateIndex - 1;
                    let question = sentence.splice(0, adpositionIndex);
                    let answer = sentence;
                    _qaSentence.question = `${this.getText(question)}?`;
                    _qaSentence.answer = [this.getText(answer)];
                }
                
            }
            _qaSentences.push(_qaSentence)
        }
        return _qaSentences;
    }

    private isAdposition(term:ITagged):boolean{
        return (term.tags[0] == eagle.adposition.category.adposition)
        ? true
        : false
    }

    private isPunctuation(term:ITagged):boolean{
        return (term.tags[0] == eagle.punctuation.period || term.tags[0] == eagle.punctuation.comma)
        ? true
        : false
    }

    private extractWhereQuestion(sentencesTagged:Array<ITagged[]>):IQASentence[]{
        let _qaSentences: IQASentence[] = [];
        for(let sentence of sentencesTagged){
            let _qaSentence: IQASentence = {question: "", answer: [""], sentence: sentence[0].sentence}
            let mainVerbIndex = this.findMainVerbIndex(sentence);
            if(((mainVerbIndex + 2 ) < sentence.length) || ((mainVerbIndex + 1) < sentence.length)){
                let locationIndex = this.findLocationIndex(sentence);
                if(locationIndex > -1){
                    let spliceIndex = -1;
                    if(sentence[locationIndex - 1].tags[0] == eagle.adposition.category.adposition) {
                        spliceIndex = locationIndex - 1;
                    } else if(sentence[locationIndex - 2].tags[0] == eagle.adposition.category.adposition) {
                        spliceIndex = locationIndex - 2
                    } 
                    let question = this.getText(sentence.splice(0, spliceIndex + 1));
                    question = question + "?";
                    let answer = this.getText(sentence);
                    _qaSentence.answer = [answer];
                    _qaSentence.question = question;
                }
            }
            _qaSentences.push(_qaSentence);
        }
        return _qaSentences;
    }

    getText(taggedSentences:ITagged[]): string {
        let text:string = ""
        for(let term of taggedSentences){
            text += ","+term.term;
        }
        text = text.replace(/,,/g, "#");
        text = text.replace(/,/g, " ")
        text = text.replace(/#/g, ",")
        return text;
    }

    private findDateIndex(taggedSentences:ITagged[]):number {
        for(let index = 0; index < taggedSentences.length; index++){
            if(taggedSentences[index].tags[0] == eagle.date.category.date){
                return index;
            }
        }
        return -1;
    }


    private findLocationIndex(taggedSentences:ITagged[]):number{
        let index = 0;
        for(let term of taggedSentences){
            if(this.isLocation(term)){
                return index;
            }
            index ++;
        }
        return -1;
    }

    private isLocation(taggedSentence:ITagged):boolean{

        return (taggedSentence && taggedSentence.tags[4] == eagle.noun.neclass.location) 
            ? true
            : false
    }

    private findMainVerbIndex(taggedSentence:ITagged[]):number{
        let index = 0;
        for(let term of taggedSentence){
            if(term.tags[0] == eagle.verb.category.verb && term.tags[1] == eagle.verb.type.main){
                return index;
            }
            index ++;
        }
        return -1;
    }

    private isValidWhereQuestion(sentence: ISentence): boolean{
        if(sentence.text.indexOf("?")) return false;
        if(sentence.text.startsWith("Onde")) return false;
        for(let rule of FILTER_RULES.where){
            if(this.shouldCapitalize(sentence, question.where)){
                if(sentence.text.indexOf(rule)){
                    return false;
                }
            }
        }
    }

    private isValidWhyQuestion(){

    }

    private isValidWhoQuestion(){

    }

    private isValidWhenQuestion(){

    }

    private shouldCapitalize(word, type){
        for(let rule of MUST_CAPITALIZE[type]){
            if(word == rule){
                return true;
            }
        }
    }

    public createTaggedObject(sentence:ISentence, termTagged:string):ITagged{
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