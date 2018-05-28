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
    'う',
    'つ',
    'る',
    'く',
    'ぐ',
    'ぬ',
    'ぶ',
    'む',
    'す',
    'いる',
    'える',
    'する',
    'くる'
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
        public kanjiText?: string,
        public romanjiText?: string,
        public definitions?: BaseEntity[],
        public searchText?: string,
        public answer?: string,
    ) {
    }
}
