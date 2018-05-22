import { ISentence } from './sentence.interface';
export interface IQASentence {
    sentence: ISentence,
    question: string,
    answer: string[]
}