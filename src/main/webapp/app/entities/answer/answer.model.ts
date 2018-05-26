import { BaseEntity, User } from './../../shared';

export class Answer implements BaseEntity {
    constructor(
        public id?: number,
        public correct?: boolean,
        public date?: any,
        public input?: string,
        public user?: User,
        public verb?: BaseEntity,
        public conjugatedVerb?: BaseEntity,
    ) {
    }
}
