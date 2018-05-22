import { ISentence } from "./sentence.interface";

export interface ICandidatesObject {
    where: Array<ISentence>,
    when: Array<ISentence>,
    who: Array<ISentence>,
    why: Array<ISentence>,
    what: Array<ISentence>,
}