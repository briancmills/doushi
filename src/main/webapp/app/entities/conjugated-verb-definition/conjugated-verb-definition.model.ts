import { BaseEntity } from './../../shared';

export class ConjugatedVerbDefinition implements BaseEntity {
    constructor(
        public id?: number,
        public definition?: string,
        public conjugatedVerb?: BaseEntity,
    ) {
    }
}
