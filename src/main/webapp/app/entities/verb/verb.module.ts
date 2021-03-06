import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoushiSharedModule } from '../../shared';
import {
    VerbService,
    VerbPopupService,
    VerbComponent,
    VerbDetailComponent,
    VerbDialogComponent,
    VerbPopupComponent,
    VerbDeletePopupComponent,
    VerbDeleteDialogComponent,
    verbRoute,
    verbPopupRoute,
} from './';

const ENTITY_STATES = [
    ...verbRoute,
    ...verbPopupRoute,
];

@NgModule({
    imports: [
        DoushiSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VerbComponent,
        VerbDetailComponent,
        VerbDialogComponent,
        VerbDeleteDialogComponent,
        VerbPopupComponent,
        VerbDeletePopupComponent,
    ],
    entryComponents: [
        VerbComponent,
        VerbDialogComponent,
        VerbPopupComponent,
        VerbDeleteDialogComponent,
        VerbDeletePopupComponent,
    ],
    providers: [
        VerbService,
        VerbPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiVerbModule {}
