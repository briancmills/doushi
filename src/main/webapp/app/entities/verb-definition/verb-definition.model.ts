import { BaseEntity } from './../../shared';

export class VerbDefinition implements BaseEntity {
    constructor(
        public id?: number,
        public definition?: string,
        public verb?: BaseEntity,
    ) {
    }
}
