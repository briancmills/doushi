import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import { VerbService } from '../verb/verb.service';
import {
    LessonComponent,
    lessonRoute,
} from './';

const ENTITY_STATES = [
    ...lessonRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LessonComponent,
    ],
    entryComponents: [
        LessonComponent,
    ],
    providers: [
        VerbService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiLessonModule {}
