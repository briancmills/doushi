import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import { VerbService } from '../verb/verb.service';
import {
    StudySheetComponent,
    StudySheetDetailComponent,
    studySheetRoute,
} from './';

const ENTITY_STATES = [
    ...studySheetRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StudySheetComponent,
        StudySheetDetailComponent,
    ],
    entryComponents: [
        StudySheetComponent,
        StudySheetDetailComponent,
    ],
    providers: [
        VerbService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiStudySheetModule {}
