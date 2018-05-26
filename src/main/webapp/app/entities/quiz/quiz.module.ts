import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import { VerbService } from '../verb/verb.service';
import {
    QuizComponent,
    quizRoute,
} from './';

const ENTITY_STATES = [
    ...quizRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        QuizComponent,
    ],
    entryComponents: [
        QuizComponent,
    ],
    providers: [
        VerbService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiQuizModule {}
