import { BaseEntity } from './../../shared';
import { Verb } from '../verb/verb.model';

export const enum ConjugationType {
    'dictionary',
    'masu',
    'nai',
    'te',
    'ta',
    'potential',
    'conditional',
    'volitional'
}

export class ConjugatedVerb implements BaseEntity {
    constructor(
        public id?: number,
        public conjugationType?: ConjugationType,
        public romanjiText?: string,
        public kanjiText?: string,
        public answer?: string,
        public verb?: Verb,
        public definitions?: BaseEntity[],
    ) {
    }
}
