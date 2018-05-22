import { ITagged } from './tagged.interface';
import { ISentence } from "./sentence.interface";

export interface ITaggedsObject {
    where: Array<ITagged[]>,
    when: Array<ITagged[]>,
    who: Array<ITagged[]>,
    why: Array<ITagged[]>,
    what: Array<ITagged[]>,
}