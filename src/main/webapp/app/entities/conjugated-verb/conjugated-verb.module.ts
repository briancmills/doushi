import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import {
    ConjugatedVerbService,
    ConjugatedVerbPopupService,
    ConjugatedVerbComponent,
    ConjugatedVerbDetailComponent,
    ConjugatedVerbDialogComponent,
    ConjugatedVerbPopupComponent,
    ConjugatedVerbDeletePopupComponent,
    ConjugatedVerbDeleteDialogComponent,
    conjugatedVerbRoute,
    conjugatedVerbPopupRoute,
} from './';

const ENTITY_STATES = [
    ...conjugatedVerbRoute,
    ...conjugatedVerbPopupRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ConjugatedVerbComponent,
        ConjugatedVerbDetailComponent,
        ConjugatedVerbDialogComponent,
        ConjugatedVerbDeleteDialogComponent,
        ConjugatedVerbPopupComponent,
        ConjugatedVerbDeletePopupComponent,
    ],
    entryComponents: [
        ConjugatedVerbComponent,
        ConjugatedVerbDialogComponent,
        ConjugatedVerbPopupComponent,
        ConjugatedVerbDeleteDialogComponent,
        ConjugatedVerbDeletePopupComponent,
    ],
    providers: [
        ConjugatedVerbService,
        ConjugatedVerbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiConjugatedVerbModule {}
