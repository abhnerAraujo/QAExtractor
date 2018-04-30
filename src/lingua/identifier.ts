import { RULES } from './rules';
export class Identifier {
    
    private candidateSentences = {
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

    getCandidates(){
        return this.candidateSentences;
    }

    startIdentifying(){
        this.identify('what');
        this.identify('where');
        this.identify('when');
        this.identify('who');
        this.identify('why');
    }
    // && !(this.candidateSentences[type].indexOf(sentence))
    identify(type:string){
        for(let sentence of this.sentences){
            if(sentence && this.isValidSentenceForType(sentence, type)){
                this.candidateSentences[type].push(sentence)
            }
        }
    }

    private isValidSentenceForType(sentence, type){
        for(let rule of RULES[type]){
            if(sentence.indexOf(rule) >= 0){
                console.log(rule)
                return true;
            }
        }
        return false
    }

    private exists(type, value){
        for(let sentence of this.candidateSentences[type]){
            if(sentence == value){
                return true;
            }
        }
        return false;
    }

}