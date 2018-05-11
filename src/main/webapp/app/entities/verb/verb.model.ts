import { BaseEntity } from './../../shared';

export const enum VerbType {
    'GODAN',
    ' ICHIDAN',
    ' IRREGULAR'
}

export const enum JlptLevel {
    'N5',
    ' N4',
    ' N3',
    ' N2',
    ' N1'
}

export const enum VerbEnding {
    'u',
    ' tsu',
    ' ru',
    ' ku',
    ' gu',
    ' nu',
    ' bu',
    ' mu',
    ' su',
    ' iru',
    ' eru',
    ' suru',
    ' kuru'
}

export class Verb implements BaseEntity {
    constructor(
        public id?: number,
        public type?: VerbType,
        public definition?: string,
        public jlptLevel?: JlptLevel,
        public gradeLevel?: number,
        public ending?: VerbEnding,
        public verbText?: string,
        public definitions?: BaseEntity[],
    ) {
    }
}
