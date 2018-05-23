export const EAGLE = {
    adjective: {
        category: {
            adjective:"A"
        },
       	type: {
            ordinal:"O",
            qualificative:"Q",
            possessive:"P"
        },
        degree: {
            superlative:"S",
            evaluative:"V"
        },
        gender: {
            feminine:"F",
            maculine:"M",
            common:"C"
        },
        number: {
            singular:"S",
            plural:"P",
            invariable:"N"
        },
        possessorpers: {
            first:"1",
            second:"2",
            third:"3"
        },
        possessornum: {
            singular:"S",
            plural:"P",
            invariable:"N"
        }
    },
    conjunction: {
        category: {
            conjunction:"C"
        },
        type:{
            coordinating:"C",
            subordinating:"S"
        }
    },
    determiner: {
        category: {
            determiner:"D"
        },
        type: {
            article:"A",
            deminstrative:"D",
            exclamative:"E",
            indefinite:"I",
            interrogative:"T",
            numeral:"N",
            possessive:"P"
        },
        person: {
            first:"1",
            second:"2",
            third:"3"
        },
        gender: {
            feminine:"F",
            maculine:"M",
            common:"C",
            neuter:"N"
        },
        number: {
            singular:"S",
            plural:"P",
            invariable:"N"
        },
        possessornum: {
            singular:"S",
            plural:"P"
        }
    },
    noun: {
        category: {
            noun:"N"
        },
        type: {
            commom:"C",
            proper:"P"
        },
        gender: {
            feminine:"F",
            maculine:"M",
            common:"C",
            neuter:"N"
        },
        number: {
            singular:"S",
            plural:"P",
            invariable:"N"
        },
        neclass:{
            person:"S",
            location:"G",
            organization:"O",
            other:"V"
        },
        degree: {
            augmentative:"A",
            diminutive:"D"
        }
    },
    pronoun: {
        category: {
            pronoun:"P"
        },
        type: {
            demonstrative:"D",
            exclamative:"E",
            indefinite:"I",
            interrogative:"T",
            numeral:"N",
            personal:"P",
            relative:"R"
        },
        person: {
            first:"1",
            second:"2",
            third:"3"
        },
        gender: {
            feminine:"F",
            maculine:"M",
            common:"C",
            neuter:"N"
        },
        number: {
            singular:"S",
            plural:"P",
            invariable:"N"
        },
        case: {
            nominative:"N",
            accusative:"A",
            dative:"D",
            oblique:"O"
        },
        polite: {
            yes:"P"            
        }
    },
    adverb: {
        category: {
            adverb:"R"
        },
        type:{
            negative:"N",
            general:"G"
        }
    },
    adposition: {
        category: {
            adposition:"S"
        },
        type:{
            preposition:"P"
        }
    },
    verb: {
        category: {
            verb: "V"
        },
        type: {
            main: "M",
            auxiliary: "A",
            semiauxiliary:"S"
        },
        mood: {
             indicative:"I",
             subjunctive:"S",
             imperativetive:"M",
             pastparticiple:"P",
             gerund:"G",
             infinitive:"N",
        },
        tense: {
            presente:"P",
            imperfect:"I",
            future:"F",
            past:"S",
            conditional:"C",
            plusquamperfect:"M",
        },
        person: {
            first:"1",
            second:"2",
            third:"3"
        }
    },
    number: {
        category: {
            number:"Z",
        },
        type: {
            partitive:"d",
            currency:"m",
            ratio:"p",
            unit:"u"
        }
    },
    date: {
        category: {
            date:"W"
        }
    },
    interjection: {
        category: {
            interjection:"I"
        }
    },
    punctuation: {
        colon:"Fd",
        comma:"Fc",
        etc:"Fs",
        exclamationmark:"Fat",
        parenthesisOpen:"Fpt",
        parenthesisClose:"Fpa",
        percentage:"Ft",
        period:"Fp",
        questionmark:"Fit",
        semicolon:"Fx",
        slash:"Fh",
    }
}