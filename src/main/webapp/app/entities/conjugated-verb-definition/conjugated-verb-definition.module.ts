import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import {
    ConjugatedVerbDefinitionService,
    ConjugatedVerbDefinitionPopupService,
    ConjugatedVerbDefinitionComponent,
    ConjugatedVerbDefinitionDetailComponent,
    ConjugatedVerbDefinitionDialogComponent,
    ConjugatedVerbDefinitionPopupComponent,
    ConjugatedVerbDefinitionDeletePopupComponent,
    ConjugatedVerbDefinitionDeleteDialogComponent,
    conjugatedVerbDefinitionRoute,
    conjugatedVerbDefinitionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...conjugatedVerbDefinitionRoute,
    ...conjugatedVerbDefinitionPopupRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConjugatedVerbDefinitionComponent,
        ConjugatedVerbDefinitionDetailComponent,
        ConjugatedVerbDefinitionDialogComponent,
        ConjugatedVerbDefinitionDeleteDialogComponent,
        ConjugatedVerbDefinitionPopupComponent,
        ConjugatedVerbDefinitionDeletePopupComponent,
    ],
    entryComponents: [
        ConjugatedVerbDefinitionComponent,
        ConjugatedVerbDefinitionDialogComponent,
        ConjugatedVerbDefinitionPopupComponent,
        ConjugatedVerbDefinitionDeleteDialogComponent,
        ConjugatedVerbDefinitionDeletePopupComponent,
    ],
    providers: [
        ConjugatedVerbDefinitionService,
        ConjugatedVerbDefinitionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiConjugatedVerbDefinitionModule {}
