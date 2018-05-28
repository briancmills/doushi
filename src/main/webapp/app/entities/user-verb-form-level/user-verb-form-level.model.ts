import { BaseEntity, User } from './../../shared';

export const enum KyuDan {
    'MUKYU',
    'KYUKYU',
    'HACHIKYU',
    'NANAKYU',
    'ROKYU',
    'GOKYU',
    'YONKYU',
    'SANKYU',
    'NIKYU',
    'IKKYU',
    'SHODAN'
}

export class UserVerbFormLevel implements BaseEntity {
    constructor(
        public id?: number,
        public level?: KyuDan,
        public user?: User,
        public verb?: BaseEntity,
        public conjugatedVerb?: BaseEntity,
    ) {
    }
}
