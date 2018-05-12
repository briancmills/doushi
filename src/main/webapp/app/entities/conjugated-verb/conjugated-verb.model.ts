import { BaseEntity } from './../../shared';

export const enum ConjugationType {
    'dictionary',
    ' masu',
    ' nai',
    ' te',
    ' ta',
    ' potential',
    ' conditional',
    ' volitional'
}

export class ConjugatedVerb implements BaseEntity {
    constructor(
        public id?: number,
        public conjugationType?: ConjugationType,
        public english?: string,
        public japanese?: string,
        public verb?: BaseEntity,
        public definitions?: BaseEntity[],
    ) {
    }
}
