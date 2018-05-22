import { ISentence } from "./sentence.interface";

export interface ITagged {
    sentence:ISentence,
    term: string,
    primitiveForm: string,
    tags: string[]
}